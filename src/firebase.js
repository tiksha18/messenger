import firebase from "firebase/app";  // this resides in our node modules and we installed it using npm
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCSacMTXrRixZ0oyGct1W6hAOA_Vy5vlfk",
    authDomain: "mymessenger-7b1e5.firebaseapp.com",
    projectId: "mymessenger-7b1e5",
    storageBucket: "mymessenger-7b1e5.appspot.com",
    messagingSenderId: "855269162898",
    appId: "1:855269162898:web:a5b87434c7fd7f8978cb4b"
}).auth();