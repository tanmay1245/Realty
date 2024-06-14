import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "realty-f4a3b.firebaseapp.com",
    projectId: "realty-f4a3b",
    storageBucket: "realty-f4a3b.appspot.com",
    messagingSenderId: "567910480966",
    appId: "1:567910480966:web:20a40fc0705f6232e15e47"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);