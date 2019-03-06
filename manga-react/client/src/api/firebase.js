  // Initialize Firebase
//   const firebase = require("firebase/app");
    import firebase from 'firebase'
  require("firebase/firestore");

  var config = {
    apiKey: "AIzaSyDlvrrx0P5DN_IQ89g_wABSWijbOaG3hb4",
    authDomain: "kitsu-react.firebaseapp.com",
    databaseURL: "https://kitsu-react.firebaseio.com",
    projectId: "kitsu-react",
    storageBucket: "",
    messagingSenderId: "770635396408"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();
//   provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  export {
      provider,
      firebase
  }