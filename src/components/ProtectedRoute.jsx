import React from 'react'
import { Navigate } from 'react-router-dom';
import {auth} from "../lib/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import {BallTriangle} from "react-loader-spinner";

const ProtectedRoute = ({children}) => {
  const [user, loading, error] = useAuthState(auth);


  // If fakeAuth is true, redirect to login page

  if (loading) {
    return (
        <div className={'h-screen w-screen flex flex-col gap-5 justify-center items-center align-middle bg-gray-300-100'}>
          <BallTriangle
              heigth="150"
              width="150"
              color="orange"
              ariaLabel="loading-indicator"
          />
            <code className={'text-xl text-gray-600 italic '}>Loading...</code>
        </div>);
  }

  if (!loading && !user) {
    return <Navigate to='/login' replace/>
  } else return children;

}


export default ProtectedRoute