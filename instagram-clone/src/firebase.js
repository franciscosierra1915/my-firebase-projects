import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAiEx-1CMsSsiaAXoDZs8rKbG5KDVyxlF8",
    authDomain: "instagram-clone-react-97ed7.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-97ed7.firebaseio.com",
    projectId: "instagram-clone-react-97ed7",
    storageBucket: "instagram-clone-react-97ed7.appspot.com",
    messagingSenderId: "1094600776918",
    appId: "1:1094600776918:web:3b9bb7caed709329f2bd77",
    measurementId: "G-YL9HPGVZY5"
});

const db = firebaseApp.firestore();
const auth = firebase.auth()
const storage = firebase.storage();

export { db, auth, storage };

   