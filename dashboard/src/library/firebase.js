import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPw2Woux1wRG_HkRHRdvPLq0CHiH45eeM",
  authDomain: "kadoqu-62a82.firebaseapp.com",
  databaseURL: "https://kadoqu-62a82.firebaseio.com",
  projectId: "kadoqu-62a82",
  storageBucket: "kadoqu-62a82.appspot.com",
  messagingSenderId: "806851639282",
  appId: "1:806851639282:web:bc761affbb9b3d54325d6b",
  measurementId: "G-JQM9PK1YR6"
};

firebase.initializeApp(firebaseConfig);

export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();
