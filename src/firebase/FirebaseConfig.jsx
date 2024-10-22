import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgYxNIahrHCWQmBDDnDUAP2MYZnYwLaho",
  authDomain: "ecomapp23.firebaseapp.com",
  projectId: "ecomapp23",
  storageBucket: "ecomapp23.appspot.com",
  messagingSenderId: "677962024134",
  appId: "1:677962024134:web:d9e9b303d74ae42d6b83c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
