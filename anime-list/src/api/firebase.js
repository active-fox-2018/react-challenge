import firebase from "firebase"

var config = {
  apiKey: "AIzaSyASIls4--S_hf7ywzONdrVw-N-NPSMx-Uw",
  authDomain: "react-challenge-c02ae.firebaseapp.com",
  databaseURL: "https://react-challenge-c02ae.firebaseio.com",
  projectId: "react-challenge-c02ae",
  storageBucket: "react-challenge-c02ae.appspot.com",
  messagingSenderId: "437821503432"
};
firebase.initializeApp(config);
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore()

export { firebase, provider, db }