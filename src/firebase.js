import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "Your apiKey",
    authDomain: "Your authDomain",
    projectId: "Your projectId",
    storageBucket: "Your storageBucket",
    messagingSenderId: "Your messagingSenderId",
    appId: "Your appId",
    measurementId: "Your measurementId"
};


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, storage,auth,provider}
