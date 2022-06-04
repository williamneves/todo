import React, { useState } from 'react';
import { SiTodoist } from 'react-icons/si';
import {FiUserPlus} from 'react-icons/fi';
import InputFloater from './InputFloater';
import {Link} from 'react-router-dom';
import './Login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<section className='h-scheen w-full bg-gradient-to-r from-cyan-900 to-blue-900 flex justify-center items-center'>
			{/* Login Container */}
			<div className='loginBox'>
				<div className='flex justify-between h-full w-full'>
					<div className='hidden md:block w-2/5 p-5 self-center'>
						<img src={'assets/login.svg'} className='scale-150' alt='Login Image Hero' />
					</div>
					<div className='flex w-full md:w-3/5 items-center justify-center'>
						<div className='flex flex-col w-full items-center p-5 gap-4 justify-center'>
							<div>
								<div className='brandHeader'>
									<SiTodoist className='text-orange-600' />
									<span className='font-bold dark:text-stone-200'>Todo-it!</span>
								</div>
								<h3 className='text-xl tracking-tight'>Welcome Back!</h3>
              </div>
							<div className='w-full px-4 md:w-3/4 md:px-8'>
              	<div className='mt-4 flex items-center justify-between'>
									<span className='border-b w-1/5 lg:w-1/4'></span>
									<span className='text-xs text-center text-gray-500 uppercase'>
										sign in with email
									</span>
									<span className='border-b w-1/5 lg:w-1/4'></span>
								</div>
								<div>
									<form>
										<InputFloater
											type={'email'}
											name={'email'}
											value={email}
											handleChange={(e) => setEmail(e.target.value)}
											label={'Enter your Email'}
                      elementClass={ 'my-4' }
										/>
										<InputFloater
											type={'password'}
											name={'password'}
											value={password}
											handleChange={(e) => setPassword(e.target.value)}
											label={'Enter your Password'}
											elementClass={'my-4'}
										/>
										<button type='submit' className='btnLogin btnForm bg-blue-800 '>
											Sign in
										</button>
									</form>
								</div>
								<div className='mt-4 flex items-center justify-between'>
									<span className='border-b w-1/5 lg:w-1/4'></span>
									<span className='text-xs text-center text-gray-500 uppercase'>
										or sign in with
									</span>
									<span className='border-b w-1/5 lg:w-1/4'></span>
								</div>
								<div className='flex md:flex-col gap-3 py-1 justify-between items-center mt-3'>
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
												<path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' fill='#1C96E8' />
											</svg>
										</div>
										<h1 className='text-center text-gray-600 font-bold '>Twitter</h1>
									</div>
									
								</div>
								<div className='mt-4 flex items-center justify-between'>
									<span className='border-b w-1/5 lg:w-1/4'></span>
									<Link to='/register' className='text-xs text-center text-blue-500 transtion-all duration-150 ease-in-out hover:text-blue-800 uppercase flex items-center gap-1 font-bold'>
										<FiUserPlus className='text-base mr-1 ' /> or sign up now
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

export default Login;
