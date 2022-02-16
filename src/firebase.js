import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "vampire-research.firebaseapp.com",
  projectId: "vampire-research",
  storageBucket: "vampire-research.appspot.com",
  messagingSenderId: "444693724107",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-L6P85RGSFE"
});

export default getFirestore();