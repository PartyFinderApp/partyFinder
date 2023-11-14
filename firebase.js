import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/storage';
//firbase web config
const firebaseConfig = {
    apiKey: "AIzaSyA93E4LGr1bBnOEA5xliRMlOxuyFvkEWgg",
    authDomain: "partyfinder-aa2d5.firebaseapp.com",
    projectId: "partyfinder-aa2d5",
    storageBucket: "partyfinder-aa2d5.appspot.com",
    messagingSenderId: "204716661921",
    appId: "1:204716661921:web:d8e06bbfbf5c4338a624e0",
    measurementId: "G-LJWE8LERVR"
  };
  

//export so i can use firebase in other files 
const app = firebase.initializeApp(firebaseConfig);
export const dbFirebase = app.firestore(); //export firebase firestore
export const auth = app.auth(); //export firebase Auth
export const firestore = firebase.firestore(); //export firebase firestore
export const storage = firebase.storage(); //export firebase Storage
