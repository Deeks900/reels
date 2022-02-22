//compat Library made firebase compatible with version 8 as well as version 9
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC16lhPob5LUmJ86orSSuu7phdjeY6JBBU",
  authDomain: "reel-e6d7d.firebaseapp.com",
  projectId: "reel-e6d7d",
  storageBucket: "reel-e6d7d.appspot.com",
  messagingSenderId: "770296379429",
  appId: "1:770296379429:web:636f460c8947cf0658a7cc"
  };
  //initializeApp is a method of firebase Object
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  const firestore = firebase.firestore();
  export const database = {
    users: firestore.collection("users"),
    posts: firestore.collection("posts"),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
  }
  export const storage = firebase.storage();