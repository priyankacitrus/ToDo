import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBiLqGkB1QansNrHkN-ka6tGoYgm5L4tp4",
    authDomain: "sixth-clone-321915.firebaseapp.com",
    databaseURL: "https://sixth-clone-321915-default-rtdb.firebaseio.com",
    projectId: "sixth-clone-321915",
    storageBucket: "sixth-clone-321915.appspot.com",
    messagingSenderId: "117308653573",
    appId: "1:117308653573:web:884a894d9c97a3573e9c6c",
    measurementId: "G-KES7GV14HJ"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
    
  export default database;