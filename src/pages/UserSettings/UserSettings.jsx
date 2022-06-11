import React, { useState } from 'react';
import './UserSettings.css';
import InputRounded from './../../components/common/InputRounded/InputRounded';

const UserSettings = () => {
	//Create states
	const [userInfo, setUserInfo] = useState({
		displayName: 'John Doe',
		firstName: 'John',
		lastName: 'Doe',
		email: 'johndoe@gmail.com',
		password: '123456',
	});
	const [onEdit, setOnEdit] = useState(true);
	// Dummy data
	const photoURL =
		'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80';
	const displayName = 'John Doe';
	const firstName = 'John';
	const lastName = 'Doe';
	const email = 'johndoe@gmail.com';
	const password = '123456';

	const handleInputChanges = (e) => {
		const { name, value } = e.target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	// Handle Submit User Edit Info
	const handleEditUserInfo = (e) => {
		e.preventDefault();
		console.log('submit');
	};

	return (
		<div className='flex justify-center w-full'>
			<div className={'userSettings'}>
				{/* Left */}
				<div className='flex flex-col gap-5 items-center min-w-[33%]'>
					{/* PhotoProfile */}
					<div className='profileContainer group' onClick={() => {}}>
						{/* Photo */}
						<div>
							<img src={photoURL} alt='profile' className='profilePhoto' />
						</div>
						{/* overlap background */}
						<div className='overlapProfileIcon '>
							{/* Icon */}
							<svg
								className='w-12 h-12'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
								/>
							</svg>
						</div>
					</div>
					{/* Actions Buttons */}
					<div className='flex flex-col gap-1 w-full py-3 capitalize border-y  px-2 text-xs text-slate-600 dark:text-slate-200'>
						<p>Last login: yesterday</p>
						<p>User since: 1/1/2019</p>
						<p>Total Tasks: 0</p>
						<p>Completed Tasks: 0</p>
					</div>
					{/* reset password */}
					<div className='flex flex-col gap-2 w-full'>
						<div className='flex flex-col gap-2 w-full'>
							<button
								type='button'
								className='transition-all-300 flex items-center justify-center gap-3 btn-dark'>
								<span>
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
										/>
									</svg>
								</span>
								Reset Password
							</button>
						</div>

						{/* Edit Info */}
						<div className='flex flex-col gap-2 w-full'>
							<button
								type='button'
								className='transition-all-300 flex items-center justify-center gap-3 btn-outline-yellow'>
								<span>
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
										/>
									</svg>
								</span>
								Edit Info
							</button>
						</div>
						{/* Logout */}
						<div className='flex flex-col gap-2 w-full'>
							<button
								type='button'
								className='btn-outline-red transition-all-300 flex items-center justify-center gap-3'>
								Logout
								<span>
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={1}
											d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
										/>
									</svg>
								</span>
							</button>
						</div>
					</div>
				</div>
				{/* Right */}
				<div className='flex'>
					{/* UserInfo */}

					<form onSubmit={handleEditUserInfo}>
						<div className='grid gap-6 mb-6 lg:grid-cols-2'>
							<InputRounded
								name='displayName'
								type='text'
								// extraClassLabel=''
								// extraClassInput=''
								labelText='Full Name'
								placeholder={'Display Name'}
								required=''
								disabled=''
								validate=''
								readonly={!onEdit}
								// styleLabel={{'display': 'none'}}
								// styleInput={{'display': 'none'}}
								handleFocus={() => console.log('focus')}
								handleBlur={() => console.log('blur')}
								handleChange={handleInputChanges}
								value={userInfo.displayName}
							/>
							<InputRounded
								name='email'
								type='email'
								// extraClassLabel=''
								// extraClassInput=''
								labelText='Email'
								placeholder={email}
								required=''
								disabled=''
								validate=''
								readonly={!onEdit}
								// styleLabel={{'display': 'none'}}
								// styleInput={{'display': 'none'}}
								handleFocus={() => console.log('focus')}
								handleBlur={() => console.log('blur')}
								handleChange={handleInputChanges}
								value={userInfo.email}
							/>
							<InputRounded
								name='firstName'
								type='text'
								extraClassLabel=''
								extraClassInput=''
								labelText='First Name'
								placeholder='John'
								required=''
								disabled=''
								validate=''
								readonly={!onEdit}
								// styleLabel={{'display': 'none'}}
								// styleInput={{'display': 'none'}}
								handleFocus={() => console.log('focus')}
								handleBlur={() => console.log('blur')}
								handleChange={handleInputChanges}
								value={userInfo.firstName}
							/>
							<InputRounded
								name='lastName'
								type='text'
								extraClassLabel=''
								extraClassInput=''
								labelText='Last Name'
								placeholder='Due'
								required=''
								disabled=''
								validate=''
								readonly={!onEdit}
								// styleLabel={{'display': 'none'}}
								// styleInput={{'display': 'none'}}
								// handleFocus={() => console.log('focus')}
								// handleBlur={() => console.log('blur')}
								handleChange={handleInputChanges}
								value={userInfo.lastName}
							/>
						</div>

						<button
							type='submit'
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							Submit
						</button>
					</form>

					{/* User Aditional info */}

					{/* Button to edit and Update */}
				</div>
			</div>
		</div>
	);
};

export default UserSettings;
