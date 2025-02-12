// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAubpyizuctxbnjKeGDlkV2CqM1itGpC9Q",
  authDomain: "databridge-515cd.firebaseapp.com",
  projectId: "databridge-515cd",
  storageBucket: "databridge-515cd.firebasestorage.app",
  messagingSenderId: "157011917528",
  appId: "1:157011917528:web:460f4e2e18fb64adeaf5ad",
  measurementId: "G-FZ8EJQXC8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();


