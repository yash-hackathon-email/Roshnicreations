import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcLX_-UWIVsHsluwd0SWBFEDZMLE8NMM4",
  authDomain: "roshni-creations-18a34.firebaseapp.com",
  projectId: "roshni-creations-18a34",
  storageBucket: "roshni-creations-18a34.firebasestorage.app",
  messagingSenderId: "603292984426",
  appId: "1:603292984426:web:3df398c9bd5800b5f71613",
  measurementId: "G-9HM6WQZY3N"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
