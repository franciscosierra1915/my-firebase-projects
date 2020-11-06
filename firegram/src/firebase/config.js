import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDT98wdsAp7yGZWyDW0i6BTV54stsmicTs",
    authDomain: "frank-firegram.firebaseapp.com",
    databaseURL: "https://frank-firegram.firebaseio.com",
    projectId: "frank-firegram",
    storageBucket: "frank-firegram.appspot.com",
    messagingSenderId: "848852727768",
    appId: "1:848852727768:web:fa44de039c75779df4a4ad"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { projectStorage, projectFirestore, timestamp }