import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
const app = initializeApp({
  apiKey: "AIzaSyCqvF0Y-w4fTN32f-iOVzfSh6VVvfxJ-WA",
  authDomain: "vampire-research.firebaseapp.com",
  projectId: "vampire-research",
  storageBucket: "vampire-research.appspot.com",
  messagingSenderId: "444693724107",
  appId: "1:444693724107:web:f2eef9f917aa270381944e",
  measurementId: "G-L6P85RGSFE"
}, "main");

export {
  getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut
};

export default getFirestore();

