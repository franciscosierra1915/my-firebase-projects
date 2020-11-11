import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDUkNmiqy29bg82l0YWG5_iOqzq_R3vExs",
    authDomain: "tech-friend-64422.firebaseapp.com",
    databaseURL: "https://tech-friend-64422.firebaseio.com",
    projectId: "tech-friend-64422",
    storageBucket: "tech-friend-64422.appspot.com",
    messagingSenderId: "98394270711",
    appId: "1:98394270711:web:2f04bb1407a3551bbbdcf2",
    measurementId: "G-V20977C57K"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth()
const storage = firebase.storage();
const analytics = firebase.analytics();

export { db, auth, storage, analytics };