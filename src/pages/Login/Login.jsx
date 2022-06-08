import React, {useState, useEffect} from 'react';
import {SiTodoist} from 'react-icons/si';
import {FiUserPlus} from 'react-icons/fi';
import InputFloater from '../../components/common/InputFloater/InputFloater';
import {Link} from 'react-router-dom';
import './Login.css';
import {auth, providerGoogle, providerFacebook} from "../../lib/firebase";
import {signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import toast from 'react-hot-toast';
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [valError, setValError] = useState({
        email: false,
        password: false,
    });

    const navigate = useNavigate();

    // Clear the email error message when the user starts typing again
    useEffect(() => {
        setValError({
            ...valError,
            email: false,
        });
    }, [email]);

    // Clear the password error message when the user starts typing again
    useEffect(() => {
        setValError({
            ...valError,
            password: false,
        });
    }, [password]);

    // Function to handle submit event.

    const urlHome = '/'

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                toast.success('Signed by Email successfully');
                navigate(urlHome);
            })
            .catch((error) => {
                // Handle Errors here.
                if (error.code === 'auth/wrong-password') {
                    setValError({
                        ...valError,
                        password: 'Wrong password'
                    });

                    toast.error('Wrong password');
                }
                if (error.code === 'auth/user-not-found') {
                    setValError({
                        ...valError,
                        email: 'User not found'
                    });
                    toast.error('User not found');
                }
            })
    }

    // Sign in with Google popup
    const handleGoogleLogin = () => {
        console.log('Google login');
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                toast.success('Signed by Google successfully');
                navigate(urlHome);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Sign in with Facebook popup
    const handleTwitterLogin = () => {
        console.log('Facebook login');
        signInWithPopup(auth, providerFacebook)
            .then((result) => {
                toast.success('Signed by Facebook successfully');
                navigate(urlHome);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <section
            className='h-screen w-full bg-gradient-to-r from-cyan-900 to-blue-900 flex justify-center items-center'>
            {/* Login Container */}
            <div className='loginBox'>
                <div className='flex justify-between h-full w-full'>
                    <div className='hidden md:block w-2/5 p-5 self-center'>
                        <img src={'assets/login.svg'} className='scale-150' alt='Login Image Hero'/>
                    </div>
                    <div className='flex w-full md:w-3/5 items-center justify-center'>
                        <div className='flex flex-col w-full items-center p-5 gap-4 justify-center'>
                            <div>
                                <div className='brandHeader'>
                                    <SiTodoist className='text-orange-600'/>
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
                                    <form onSubmit={handleLogin}>
                                        <InputFloater
                                            type={'email'}
                                            name={'email'}
                                            value={email}
                                            handleChange={(e) => setEmail(e.target.value)}
                                            label={'Enter your Email'}
                                            required={true}
                                            error={valError.email}
                                            elementClass={'my-4'}
                                        />
                                        <InputFloater
                                            type={'password'}
                                            name={'password'}
                                            value={password}
                                            handleChange={(e) => setPassword(e.target.value)}
                                            label={'Enter your Password'}
                                            elementClass={'my-4'}
                                            required={true}
                                            error={valError.password}
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
                                    <div className='btnLoginBrands' id={'Google'} onClick={handleGoogleLogin}>
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
                                    <div className='btnLoginBrands' id={'Twitter'} onClick={handleTwitterLogin}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6'
                                                 viewBox="0 0 24 24">
                                                <path fill={'#4267B2'}
                                                      d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                                            </svg>
                                        </div>
                                        <h1 className='text-center text-gray-600 font-bold '>Facebook</h1>
                                    </div>

                                </div>
                                <div className='mt-4 flex items-center justify-between'>
                                    <span className='border-b w-1/5 lg:w-1/4'></span>
                                    <Link to='/register'
                                          className='text-xs text-center text-blue-500 transtion-all duration-150 ease-in-out hover:text-blue-800 uppercase flex items-center gap-1 font-bold'>
                                        <FiUserPlus className='text-base mr-1 '/> or sign up now
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
