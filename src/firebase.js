import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2RbadF1nkTpjDwOrLJE38siSe_kkVstY",
  authDomain: "clone-573fa.firebaseapp.com",
  projectId: "clone-573fa",
  storageBucket: "clone-573fa.appspot.com",
  messagingSenderId: "415855279758",
  appId: "1:415855279758:web:9fdc3cf52a97c793b1d3df",
  measurementId: "G-9T6S6XCWFL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
