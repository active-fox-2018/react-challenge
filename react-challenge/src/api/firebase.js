var config = {
    apiKey: "AIzaSyCZzZBN12UU5FfCZz5nn4iQSIHKa0Rr6Iw",
    authDomain: "p3-1-9e7d0.firebaseapp.com",
    databaseURL: "https://p3-1-9e7d0.firebaseio.com",
    projectId: "p3-1-9e7d0",
    storageBucket: "p3-1-9e7d0.appspot.com",
    messagingSenderId: "399768070415"
};
window.firebase.initializeApp(config);
var firebase = window.firebase
var provider = new firebase.auth.GoogleAuthProvider();
var db = firebase.firestore();

export { provider, firebase, db }
