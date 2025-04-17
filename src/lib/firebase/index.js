import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chillz-8a35a.firebaseapp.com",
  projectId: "chillz-8a35a",
  storageBucket: "chillz-8a35a.appspot.com",
  messagingSenderId: "486798972782",
  appId: "1:486798972782:web:b54e7660720a62e9a8d37f",
};
// Initialize Firebase
const firestoreApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth(firestoreApp);
const db = getFirestore(firestoreApp);
const storage = getStorage(firestoreApp);

export { auth, googleAuthProvider, db, storage };
