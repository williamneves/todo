import {initializeApp, getApps, getApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {GoogleAuthProvider, TwitterAuthProvider, FacebookAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {getFirestore,  doc, setDoc, Timestamp, collection, addDoc } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import toast from 'react-hot-toast';


// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_CONFIG_APIKEY,
//     authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTHDOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECTID,
//     storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGINGSENDERID,
//     appId: process.env.REACT_APP_FIREBASE_CONFIG_APPID,
// };
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmItMvmEY69VuaobuEcjQfxWidgvVnI5c",
    authDomain: "todo-app-565c3.firebaseapp.com",
    projectId: "todo-app-565c3",
    storageBucket: "todo-app-565c3.appspot.com",
    messagingSenderId: "299711107436",
    appId: "1:299711107436:web:ef0291f05f6958b7042349"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Providers
const providerGoogle = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const providerFacebook = new FacebookAuthProvider();
// sign in ways

// SignOut
const logout = () => {
    toast.success('Logout Successful');
    signOut(auth);
}

// Firestore Database
const db = getFirestore(app);
// Firebase Storage
const storage = getStorage(app);

export {app, auth, providerGoogle, providerTwitter, providerFacebook, db, storage, logout, doc, setDoc, Timestamp, collection, addDoc};