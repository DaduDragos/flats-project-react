import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrNXbWNObg36msxhANC89d-RC0C0SxgC4",
  authDomain: "react-final-project-65420.firebaseapp.com",
  projectId: "react-final-project-65420",
  storageBucket: "react-final-project-65420.appspot.com",
  messagingSenderId: "995980563163",
  appId: "1:995980563163:web:21e261e0d942fa2737f2fe",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
