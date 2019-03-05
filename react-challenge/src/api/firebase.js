var config = {
    apiKey: "AIzaSyAtjOGXXZmQLotWIgTxaXpxybA8OaQve5s",
    authDomain: "project1-94f1d.firebaseapp.com",
    databaseURL: "https://project1-94f1d.firebaseio.com",
    projectId: "project1-94f1d",
    storageBucket: "project1-94f1d.appspot.com",
    messagingSenderId: "119243022249"
};
window.firebase.initializeApp(config);
var firebase = window.firebase
var provider = new firebase.auth.GoogleAuthProvider();

export { provider, firebase }
