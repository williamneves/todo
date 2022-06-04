import React, {useState} from 'react'
import { useRecoilState } from 'recoil';
import { authUserAtom } from './../atoms/userAtom';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  // const [ authUser, setAuthUser ] = useRecoilState( authUserAtom );
  const [ fakeAuth, setFakeAuth ] = useState( true );

  // If fakeAuth is true, redirect to login page
    if ( !fakeAuth ) {
      return <Navigate to='/login' replace />
    }



  return children;
}

export default ProtectedRoute