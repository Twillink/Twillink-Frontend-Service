// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtzj_5sPG9HDt-AEGxbXe1bPdNWR9BHbM",
  authDomain: "twillink-de.firebaseapp.com",
  projectId: "twillink-de",
  storageBucket: "twillink-de.firebasestorage.app",
  messagingSenderId: "984346570718",
  appId: "1:984346570718:web:d03ae054015085ed97b74f",
  measurementId: "G-M8EJXYQ1HD"
};


// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };