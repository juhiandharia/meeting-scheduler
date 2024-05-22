// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meeting-scheduler-e7a22.firebaseapp.com",
  projectId: "meeting-scheduler-e7a22",
  storageBucket: "meeting-scheduler-e7a22.appspot.com",
  messagingSenderId: "152419807281",
  appId: "1:152419807281:web:10a38b02fb9a300ec0e510",
  measurementId: "G-SMQV9N2LFM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
