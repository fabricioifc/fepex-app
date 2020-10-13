import firebase from "firebase/app";
import "firebase/firestore";

// const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyB70qbZDsJJiKCrX0sjyChOL6hSQjnxEME",
  authDomain: "fepex-app.firebaseapp.com",
  databaseURL: "https://fepex-app.firebaseio.com",
  projectId: "fepex-app",
  storageBucket: "fepex-app.appspot.com",
  messagingSenderId: "108785397058",
  appId: "1:108785397058:web:913db4ebe4db4e0a",
};

export const db = firebase.initializeApp(config).firestore();

// firebase.firestore().settings(settings);

export default firebase;
