import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDf3Fx7eiR_IO7XWXUBfp2Fxd_TeYCGdwo",
    authDomain: "drive-9a57b.firebaseapp.com",
    projectId: "drive-9a57b",
    storageBucket: "drive-9a57b.appspot.com",
    messagingSenderId: "155528135135",
    appId: "1:155528135135:web:83a313e64cf9825b61046a",
    measurementId: "G-H75DXWFLB5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, storage,auth,provider}