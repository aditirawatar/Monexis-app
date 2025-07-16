// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9l286eZ55pojHeHCrna29-XAiblPHEm8",
  authDomain: "money-nexus.firebaseapp.com",
  projectId: "money-nexus",
  storageBucket: "money-nexus.firebasestorage.app",
  messagingSenderId: "828924488317",
  appId: "1:828924488317:web:1a5d18982f0e0dde449f14",
  measurementId: "G-J0PWH2JMK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };