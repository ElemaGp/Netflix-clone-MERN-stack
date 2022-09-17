import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCLGmLmYwRDQVg4H6DKSNVQjOFZqEnLhT0",
    authDomain: "netflix-25e76.firebaseapp.com",
    projectId: "netflix-25e76",
    storageBucket: "netflix-25e76.appspot.com",
    messagingSenderId: "645845228868",
    appId: "1:645845228868:web:d590b22d52c1f2c54dcb11",
    measurementId: "G-05Y4SCW57F"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;