import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAdditionalUserInfo,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  serverTimestamp,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import toast from "react-hot-toast";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_CONFIG_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_CONFIG_APPID,
};

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCmItMvmEY69VuaobuEcjQfxWidgvVnI5c",
//   authDomain: "todo-app-565c3.firebaseapp.com",
//   projectId: "todo-app-565c3",
//   storageBucket: "todo-app-565c3.appspot.com",
//   messagingSenderId: "299711107436",
//   appId: "1:299711107436:web:ef0291f05f6958b7042349"
// };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Providers
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

// SignOut
const logout = () => {
  toast.success("Logout Successful");
  signOut(auth).then(() => {
    console.log("Logout Successful");
  });
};

// Firestore Database
const db = getFirestore(app);
// Firebase Storage
const storage = getStorage(app);

export {
  storage,
  db,
  app,
  auth,
  providerGoogle,
  providerFacebook,
  signInWithPopup,
  updateProfile,
  deleteUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
  logout,
  doc,
  setDoc,
  getDoc,
  Timestamp,
  serverTimestamp,
  collection,
  addDoc,
  onAuthStateChanged,
  signOut,
};
