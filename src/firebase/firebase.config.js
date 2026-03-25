// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTvpsyDJfPy7kvPnxmwJ_OEg8_5F728xk",
  authDomain: "my-shop-5eae2.firebaseapp.com",
  projectId: "my-shop-5eae2",
  storageBucket: "my-shop-5eae2.firebasestorage.app",
  messagingSenderId: "810524392525",
  appId: "1:810524392525:web:c7f8f49b1b69bdbfa57004"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;