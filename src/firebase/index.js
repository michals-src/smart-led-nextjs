// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKPKxaif6zlYYHpsrX7bttHzTCTNCfpNk",
  authDomain: "smart-lights-c18bd.firebaseapp.com",
  databaseURL: "https://smart-lights-c18bd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smart-lights-c18bd",
  storageBucket: "smart-lights-c18bd.appspot.com",
  messagingSenderId: "149840002836",
  appId: "1:149840002836:web:eac6af057091a2748c4c01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;