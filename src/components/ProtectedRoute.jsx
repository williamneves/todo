import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { auth, db, doc, getDoc, onAuthStateChanged } from "../lib/firebase";
import { BallTriangle } from "react-loader-spinner";
import { appContext } from "../lib/context";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const { userDB, setUserDB, authUser, setAuthUser, theme, setTheme } =
    useContext(appContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Get user info from firebase
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef).then((res) => {
          // Set user info to state
          setUserDB(res?.data());
          // Set auth user to state
          setAuthUser(user);
          // Set loading to false
          setLoading(false);
          setTheme("light");
        });
        // ...
      } else {
        // User is signed out
        // Set loading to false and users states to null
        console.log("User is signed out");
        setLoading(false);
        setUserDB(null);
        setAuthUser(null);
      }
    });
  }, [auth]);

  // If it is loading, show spinner
  if (loading) {
    return (
      <div className={theme === "dark" ? "dark" : "light"}>
        <div
          className={
            "h-screen w-screen flex flex-col gap-5 justify-center items-center align-middle bg-main-bg dark:bg-main-dark-bg"
          }
        >
          <BallTriangle
            height="150"
            width="150"
            color="orange"
            ariaLabel="loading-indicator"
          />
          <code className={"text-xl text-gray-600 dark:text-gray-200 italic "}>
            Loading...
          </code>
        </div>
      </div>
    );
  }

  // Is loading and no User founded
  if (!loading && !userDB) {
    // Redirect to login page
    return <Navigate to="/login" replace />;
  } else {
    // User is signed in return children
    return children;
  }
};

export default ProtectedRoute;
