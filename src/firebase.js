import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3LjcfiZOnoBCW_B0PZYZqajqmRNk5Lmc",
  authDomain: "clone-499a8.firebaseapp.com",
  projectId: "clone-499a8",
  storageBucket: "clone-499a8.appspot.com",
  messagingSenderId: "681551499069",
  appId: "1:681551499069:web:b9fa3f226818f277a53f54",
  measurementId: "G-PLHC7BEWMX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig) ;

const db = firebaseApp.firestore() ;
const auth = firebase.auth() ;

export {db, auth} ;