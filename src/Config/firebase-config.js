import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBE27AMk3EHNuRXc6NusQPlWN8L5LKp7Bw",
  authDomain: "fir-f8c43.firebaseapp.com",
  projectId: "fir-f8c43",
  storageBucket: "fir-f8c43.appspot.com",
  messagingSenderId: "1072901834081",
  appId: "1:1072901834081:web:06e0585297df19c7f07120",
  measurementId: "G-QME8ZW4Z4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

