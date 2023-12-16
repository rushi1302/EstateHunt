// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBugaTAx4eSosWjD-qX3Q1D7zcR3wr61Go",
    authDomain: "mern---property-app.firebaseapp.com",
    projectId: "mern---property-app",
    storageBucket: "mern---property-app.appspot.com",
    messagingSenderId: "573380105265",
    appId: "1:573380105265:web:0f415e25176ea483977110"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);