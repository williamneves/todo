import React, {useState} from 'react';
import {SiTodoist} from 'react-icons/si';
import {FiUserPlus} from 'react-icons/fi';
import InputFloater from "../../components/common/InputFloater/InputFloater";
import {Link, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import './Register.css';
import {
	auth,
	providerGoogle,
	providerFacebook,
	db,
	doc,
	setDoc,
	getDoc,
	serverTimestamp,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithPopup,
} from '../../lib/firebase';

const Register = () => {
	// User state
	const [newUser, setNewUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		photoUrl: '',
	});
	// Validation States
	const [valFirstName, setValFirstName] = useState('');
	const [valLastName, setValLastName] = useState('');
	const [valEmail, setValEmail] = useState('');
	const [valPassword, setValPassword] = useState('');
	const [valConfirmPassword, setValConfirmPassword] = useState('');

	// Other States
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Create a new auth user, and than save it to the database, and then redirect to the account page

	// Handle the change of the input fields
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewUser({ ...newUser, [name]: value });

		// Reset the error message for the input field
		if (name === 'firstName') {
			setValFirstName('');
		}
		if (name === 'lastName') {
			setValLastName('');
		}
		if (name === 'email') {
			setValEmail('');
		}
		if (name === 'password') {
			setValPassword('');
		}
		if (name === 'confirmPassword') {
			setValConfirmPassword('');
		}
	};

	// Function to validate the input fields
	const validateForm = async () => {
		let validate = true;

		// Validate first name
		if (newUser.firstName === '') {
			setValFirstName('required');
			validate = false;
		} else if (newUser.firstName.length < 2) {
			setValFirstName('Too short');
			validate = false;
		}
		// Validate last name
		if (newUser.lastName === '') {
			setValLastName('required');
			validate = false;
		} else if (newUser.lastName.length < 2) {
			setValLastName('Too short');
			validate = false;
		}
		// Validate email
		if (newUser.email === '') {
			setValEmail('required');
			validate = false;
		}
		// // Validate password
		if (newUser.password === '') {
			setValPassword('required');
			validate = false;
		}
		// // Check if password has 1 number, 1 letter, and 1 special character
		else if (
			!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newUser.password)
		) {
			setValPassword('Weak password');
			validate = false;
		}
		// // Validate confirm password
		if (newUser.confirmPassword === '') {
			setValConfirmPassword('required');
			validate = false;
			console.log('required');
		} else if (newUser.password !== newUser.confirmPassword) {
			setValConfirmPassword('Not match');
			validate = false;
		}

		// Return if validation true or false
		return validate;
	};

	// Refactoring the create user function
	const handleCreateUserWithEmail = async (e) => {
		// Prevent the page from refreshing, set the loading to true, and create a toast message
		e.preventDefault();
		setLoading(true);
		const toastId = toast.loading('Creating account...');

		// Validate the input fields
		const validate = await validateForm();

		// If validation is false, return
		if (!validate) {
			setLoading(false);
			toast.error('Something went wrong, please check your inputs', { id: toastId });
			return false;
		}

		try {
			// If validation is true, create a new user
			const createdUser = await createUserWithEmailAndPassword(
				auth,
				newUser.email,
				newUser.password
			);

			// Get random avatar photo with initials
			const photoUrl = `https://ui-avatars.com/api/?name=${newUser.firstName[0]}+${newUser.lastName[0]}&size=256&background=random`;

			await updateProfile(createdUser.user, {
				displayName: `${newUser.firstName} ${newUser.lastName}`,
				photoURL: photoUrl,
			});

			await setDoc(doc(db, 'users', createdUser.user.uid), {
				displayName: `${newUser.firstName} ${newUser.lastName}`,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				email: newUser.email,
				photoUrl: photoUrl,
				createdAt: serverTimestamp(),
			});

			// Finish the loading and redirect to the account page
			toast.success(`Welcome ${'Sr'}`, {
				id: toastId,
			});
			setLoading(false);
			navigate('/account');
		} catch (err) {
			// If there is an error, show the error message
			if (err.code === 'auth/email-already-in-use') {
				setValEmail('Email already in use');
				toast.error('Email already in use', {
					id: toastId,
				});
				setLoading(false);
				return false;
			}
			// console.log('err',err)
			toast.error('Something went wrong, please try again' + err.code, { id: toastId });
			setLoading(false);
		}
	};

	// Check if the user already exists in the database
	const userExists = async (uid) => {
		console.log('check if user exists');
		const userRef = doc(db, 'users', uid);
		const userDoc = await getDoc(userRef);

		return userDoc.exists();
	};

	// Refactoring the create user with provider function
	const handleCreateUserWithProvider = async (provider, providerName) => {
		// Set the loading to true and create a toast message
		setLoading(true);
		const toastId = toast.loading(`Signing in with ${providerName}...`);

		// Try the async function
		try {
			// Sign in with the provider
			const providerUser = await signInWithPopup(auth, provider);

			// Check if providerUser already exists in the database
			const userExistsResponse = await userExists(providerUser?.user.uid);

			// If user exists, sign the User
			if (userExistsResponse) {
				console.log('user exists');
				// User already exists
				toast.success(`Welcome back ${providerUser.user.displayName}!`, { id: toastId });
				setLoading(false);
				return navigate('/');
			}

			// If user doesn't exist, create a new user
			await setDoc(doc(db, 'users', providerUser.user.uid), {
				displayName: providerUser.user.displayName,
				firstName: providerUser.user.displayName.split(' ')[0],
				lastName: providerUser.user.displayName.split(' ')[1],
				email: providerUser.user.email,
				photoUrl: providerUser.user.photoURL,
				createdAt: serverTimestamp(),
			});

			// Finish the loading and redirect to the account page
			toast.success(`Welcome ${providerUser.user.displayName}`, { id: toastId });
			setLoading(false);
			navigate('/');
		} catch (err) {
			// If there is an error, catch and show the error message
			console.log('error', err);
			toast.error('Something went wrong: ' + err.message, { id: toastId });
			setLoading(false);
		}
	};

	// Render the page
	return (
		<section className='loginSection'>
			{/* Login Container */}
			<div className='registerBox'>
				{/*Register Image*/}
				<div className='flex justify-between h-full w-full'>
					<div className='hidden md:block w-1/5 p-5 self-center'>
						<img
							src={'assets/login.svg'}
							className='scale-350 translate-x-14'
							alt='Men and Woman login'
						/>
					</div>

					{/*Register Fields*/}
					<div className='flex w-full md:w-4/5 items-center justify-center'>
						<div className='flex flex-col w-full items-center p-5 gap-4 justify-center'>
							<div>
								<div className='brandHeader'>
									<SiTodoist className='text-orange-600' />
									<span className='font-bold dark:text-stone-200'>Todo-it!</span>
								</div>
								<h3 className='text-xl tracking-tight'>Create an Account</h3>
							</div>
							<div className='w-full px-4 md:w-5/6 lg:w-3/5 md:px-8'>
								<div className='mt-4 flex items-center justify-between'>
									<span className='border-b w-1/5 lg:w-1/4'></span>
									<span className='text-xs text-center text-gray-500 uppercase'>With Email</span>
									<span className='border-b w-1/5 lg:w-1/4'></span>
								</div>
								<div>
									<form onSubmit={handleCreateUserWithEmail}>
										<div className='flex items-center justify-between gap-3 -mb-3'>
											<InputFloater
												type={'firstName'}
												name={'firstName'}
												value={newUser.firstName}
												handleChange={handleChange}
												label={'First Name'}
												elementClass={'my-4 grow'}
												required={false}
												error={valFirstName}
											/>
											<InputFloater
												type={'lastName'}
												name={'lastName'}
												value={newUser.lastName}
												handleChange={handleChange}
												label={'Last Name'}
												elementClass={'my-4 grow'}
												required={false}
												error={valLastName}
											/>
										</div>
										<InputFloater
											type={'email'}
											name={'email'}
											value={newUser.email}
											handleChange={handleChange}
											label={'youremail@domain.com'}
											elementClass={'my-4'}
											required={false}
											error={valEmail}
										/>
										<InputFloater
											type={'password'}
											name={'password'}
											value={newUser.password}
											handleChange={handleChange}
											label={'Your Password'}
											elementClass={'my-4'}
											required={false}
											error={valPassword}
										/>
										<InputFloater
											type={'password'}
											name={'confirmPassword'}
											value={newUser.confirmPassword}
											handleChange={handleChange}
											label={'Confirm Password'}
											elementClass={'my-4'}
											required={false}
											error={valConfirmPassword}
										/>
										<button type='submit' className='btnLogin btnForm' disabled={loading}>
											{!loading && 'Create Account'}
											{loading && (
												<div className='text-center'>
													<svg
														role='status'
														className='inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
														viewBox='0 0 100 101'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'>
														<path
															d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
															fill='currentColor'
														/>
														<path
															d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
															fill='currentFill'
														/>
													</svg>
												</div>
											)}
										</button>
									</form>
								</div>
								<div className='mt-4 flex items-center justify-between'>
									<span className='border-b w-1/5 lg:w-1/4'></span>
									<span className='text-xs text-center text-gray-500 uppercase'>Or With</span>
									<span className='border-b w-1/5 lg:w-1/4'></span>
								</div>
								<div className='flex gap-3 py-1 justify-between items-center mt-3'>
									<div
										id='Google'
										area-label='Google'
										className='btnLoginBrands'
										onClick={
											!loading
												? () => handleCreateUserWithProvider(providerGoogle, 'Google')
												: () => {}
										}>
										<div>
											<svg className='h-6 w-6' viewBox='0 0 40 40'>
												<path
													d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
													fill='#FFC107'
												/>
												<path
													d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
													fill='#FF3D00'
												/>
												<path
													d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
													fill='#4CAF50'
												/>
												<path
													d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
													fill='#1976D2'
												/>
											</svg>
										</div>
										<h1 className='text-center text-gray-600 font-bold '>Google</h1>
									</div>
									<div
										id='Facebook'
										area-label='Facebook'
										className='btnLoginBrands'
										onClick={
											!loading
												? () => handleCreateUserWithProvider(providerFacebook, 'Facebook')
												: () => {}
										}>
										<div>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-6 w-6'
												viewBox='0 0 24 24'>
												<path
													fill={'#4267B2'}
													d='M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z'
												/>
											</svg>
										</div>
										<h1 className='text-center text-gray-600 font-bold '>Facebook</h1>
									</div>
								</div>
								<div className='mt-4 flex items-center justify-between'>
									<span className='border-b w-1/5 lg:w-1/4'></span>
									<Link
										to='/login'
										className='text-xs text-center text-blue-500 transtion-all duration-150 ease-in-out hover:text-blue-800 uppercase flex items-center gap-1 font-bold'>
										<FiUserPlus className='text-base mr-1 ' /> or Login
									</Link>
									<span className='border-b w-1/5 lg:w-1/4'></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Register;
