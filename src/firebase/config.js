import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBgixamuNrQkqDpmcu1aUQBPWIwn2M0_D0",
    authDomain: "rn-social-f0faa.firebaseapp.com",
    projectId: "rn-social-f0faa",
    storageBucket: "rn-social-f0faa.appspot.com",
    messagingSenderId: "261528415197",
    appId: "1:261528415197:web:8d0520d6738e44293f6434",
    measurementId: "G-HMHN4QEMY8"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };