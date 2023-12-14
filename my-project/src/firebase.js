// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernapp-5b263.firebaseapp.com",
  projectId: "mernapp-5b263",
  storageBucket: "mernapp-5b263.appspot.com",
  messagingSenderId: "946243696154",
  appId: "1:946243696154:web:5c8952a41d74d6fe0c43a3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

