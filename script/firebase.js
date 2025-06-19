import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup  } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, collection, Timestamp, onSnapshot, query, where, orderBy  } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js'


const firebaseConfig = {
    apiKey: "AIzaSyBnXfNtUPlyK1cbcE50l_Ukg0wIzd2kMs0",
    authDomain: "easyexpense-d425c.firebaseapp.com",
    projectId: "easyexpense-d425c",
    storageBucket: "easyexpense-d425c.firebasestorage.app",
    messagingSenderId: "1068374749034",
    appId: "1:1068374749034:web:242d3ba149c568598abf13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();


export {
    auth,
    db,
    provider, 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signInWithEmailAndPassword,
    doc,
    setDoc,
    Timestamp,
    collection,
    addDoc,
    onSnapshot,
    query,
    where,
    signOut,
    orderBy,
    GoogleAuthProvider,
    signInWithPopup
}