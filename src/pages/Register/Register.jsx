import React, {useState} from 'react';
import {SiTodoist} from 'react-icons/si';
import {FiUserPlus} from 'react-icons/fi';
import InputFloater from "../../components/common/InputFloater/InputFloater";
import {Link, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import './Register.css';
import {auth, providerGoogle, providerFacebook, db} from "../../lib/firebase";
import {doc, setDoc, addDoc, collection, serverTimestamp} from "firebase/firestore";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

const Register = () => {
    // User state
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        photoUrl: '',
        acceptedTerms: false,
    });
    // Validation States
    const [valFirstName, setValFirstName] = useState('');
    const [valLastName, setValLastName] = useState('');
    const [valEmail, setValEmail] = useState('');
    const [valPassword, setValPassword] = useState('');
    const [valConfirmPassword, setValConfirmPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Other States
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Create a new auth user, and than save it to the database, and then redirect to the account page

    // Handle the change of the input fields
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewUser({...newUser, [name]: value});

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
    }

    const validateForm = () => {
        let validate = true;

        // Validate first name
        if (newUser.firstName === '') {
            setValFirstName('First name is required');
            validate = false;
            console.log('First name is required');
        }
        if (newUser.firstName.length < 2) {
            setValFirstName('First name must be at least 2 characters');
            validate = false;
            console.log('First name must be at least 2 characters');
        }
        // Validate last name
        if (newUser.lastName === '') {
            setValLastName('Last name is required');
            validate = false;
            console.log('Last name is required');
        }
        else if (newUser.lastName.length < 2) {
            setValLastName('Last name must be at least 2 characters');
            validate = false;
        }
        // Validate email
        if (newUser.email === '') {
            setValEmail('Email is required');
            validate = false;
            console.log('Email is required');
        }
        // // Validate password
        if (newUser.password === '') {
            setValPassword('Password is required');
            validate = false;
            console.log('Password is required');
        }
        // // Check if password has 1 number, 1 letter, and 1 special character
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newUser.password)) {
            setValPassword('Password must contain at least 1 number, 1 letter, and 1 special character');
            validate = false;
        }
        // // Validate confirm password
        if (newUser.password !== confirmPassword) {
            setValConfirmPassword('Passwords do not match');
            validate = false;
        }

        return validate;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading('Creating account...');

        // Check if all fields are valid
        if (!validateForm()) {
            setLoading(false);
            toast.error('Something went wrong, please check your inputs',{id: toastId});
            return;
        }

        // Avatar Dual letters API
        const photoUrl = `https://ui-avatars.com/api/?name=${newUser.firstName[0]}+${newUser.lastName[0]}&size=256&background=random`;

        // Create a new auth user
        createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            .then(user => {
                // update the user's profile with display name and photo url
                console.log('auth ok', user);
                updateProfile(user.user, {
                    displayName: `${newUser.firstName} ${newUser.lastName}`,
                    photoURL: photoUrl
                }).then((res) => {
                    // Save the user to the database
                    setDoc(doc(db, 'users', user.user.uid), {
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        photoUrl: photoUrl,
                        createdAt: serverTimestamp(),
                    }).then((res) => {
                        console.log('setDoc ok', res);
                        toast.success('User created successfully',{
                            id: toastId,
                        });
                        setLoading(false);
                        // navigate('/account');
                    }).catch(err => {
                        toast.error(err.message, {
                            id: toastId,
                        });
                        setLoading(false);
                    });
                }).catch(err => {
                    // Error update user profile
                    console.log('update', err);
                    toast.error(err.message, {
                        id: toastId,
                    });
                    setLoading(false);
                })
            }).catch(err => {
            // Error creating user auth
            console.log('auth', err);
            toast.error(err.message, {
                id: toastId,
            });
            setLoading(false);
        });
    }

    // Render the page
    return (
        <section className='loginSection'>
            {/* Login Container */}
            <div className='loginBox'>
                {/*Register Image*/}
                <div className='flex justify-between h-full w-full'>
                    <div className='hidden md:block w-1/5 p-5 self-center'>
                        <img src={'assets/login.svg'} className='scale-350 translate-x-14'
                             alt='Men and Woman login'/>
                    </div>

                    {/*Register Fields*/}
                    <div className='flex w-full md:w-4/5 items-center justify-center'>
                        <div className='flex flex-col w-full items-center p-5 gap-4 justify-center'>
                            <div>
                                <div className='brandHeader'>
                                    <SiTodoist className='text-orange-600'/>
                                    <span className='font-bold dark:text-stone-200'>Todo-it!</span>
                                </div>
                                <h3 className='text-xl tracking-tight'>Create an Account</h3>
                            </div>
                            <div className='w-full px-4 md:w-3/4 md:px-8'>
                                <div className='mt-4 flex items-center justify-between'>
                                    <span className='border-b w-1/5 lg:w-1/4'></span>
                                    <span className='text-xs text-center text-gray-500 uppercase'>
										With Email
									</span>
                                    <span className='border-b w-1/5 lg:w-1/4'></span>
                                </div>
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex items-center justify-between gap-3 -mb-3">
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
                                            /></div>
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
                                            value={confirmPassword}
                                            handleChange={handleChange}
                                            label={'Confirm Password'}
                                            elementClass={'my-4'}
                                            required={false}
                                            error={valConfirmPassword}
                                        />
                                        <button type='submit' className='btnLogin btnForm bg-blue-800 '
                                                disabled={loading}>
                                            Create Account
                                        </button>
                                    </form>
                                </div>
                                <div className='mt-4 flex items-center justify-between'>
                                    <span className='border-b w-1/5 lg:w-1/4'></span>
                                    <span className='text-xs text-center text-gray-500 uppercase'>
										Or With
									</span>
                                    <span className='border-b w-1/5 lg:w-1/4'></span>
                                </div>
                                <div className='flex gap-3 py-1 justify-between items-center mt-3'>
                                    <div className='btnLoginBrands'>
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
                                    <div className='btnLoginBrands'>
                                        <div>
                                            <svg
                                                className='h-6 w-6'
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='24'
                                                height='24'
                                                viewBox='0 0 24 24'>
                                                <path
                                                    d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'
                                                    fill='#1C96E8'/>
                                            </svg>
                                        </div>
                                        <h1 className='text-center text-gray-600 font-bold '>Twitter</h1>
                                    </div>

                                </div>
                                <div className='mt-4 flex items-center justify-between'>
                                    <span className='border-b w-1/5 lg:w-1/4'></span>
                                    <Link to='/login'
                                          className='text-xs text-center text-blue-500 transtion-all duration-150 ease-in-out hover:text-blue-800 uppercase flex items-center gap-1 font-bold'>
                                        <FiUserPlus className='text-base mr-1 '/> or Login
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
