// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0m6gq_4hN-nYFm_pEULQXaOinI0Q_0iM",
  authDomain: "next-chat-efda9.firebaseapp.com",
  projectId: "next-chat-efda9",
  storageBucket: "next-chat-efda9.appspot.com",
  messagingSenderId: "195871436406",
  appId: "1:195871436406:web:db5a2f2a999af404fb7957"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const store = getFirestore()