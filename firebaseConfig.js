// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDdtldI2fB64mZly2TjkuhL29NOtEZs42A",
  authDomain: "react-login-ui-firebase.firebaseapp.com",
  databaseURL: "https://react-login-ui-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-login-ui-firebase",
  storageBucket: "react-login-ui-firebase.firebasestorage.app",
  messagingSenderId: "724627283543",
  appId: "1:724627283543:web:443d11307029d52f0b8d12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
