import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDy8aQOY22dg9PSPVKF77I3gdxm3o0A2_A",
    authDomain: "auth-crud-project.firebaseapp.com",
    projectId: "auth-crud-project",
    storageBucket: "auth-crud-project.appspot.com",
    messagingSenderId: "675885190638",
    appId: "1:675885190638:web:2704bcbf6cd5713a7792ff"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };