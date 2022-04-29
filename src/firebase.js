import {initializeApp} from "@firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore/lite";

// initialises firebase application using secret environment variables
const app = initializeApp({
  apiKey: "AIzaSyDbZqh5-ViLAhLxKk6TPZqWd30WlQZ7KU0",
  authDomain: "vampire-project2.firebaseapp.com",
  projectId: "vampire-project2",
  storageBucket: "vampire-project2.appspot.com",
  messagingSenderId: "560663838442",
  appId: "1:560663838442:web:701ea0e3389dd1aa55a193",
});

// exports necessary functions that are use throughout the application
export {getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, app};

export default getFirestore();
