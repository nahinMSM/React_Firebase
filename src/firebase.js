import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgsaY67Wi-yecXwy9Kj3gAb33L9y-TC_k",
  authDomain: "react-db-65170.firebaseapp.com",
  databaseURL: "https://react-db-65170-default-rtdb.firebaseio.com",
  projectId: "react-db-65170",
  storageBucket: "react-db-65170.firebasestorage.app",
  messagingSenderId: "56679877726",
  appId: "1:56679877726:web:a4686535ddb763969ab8cf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db };