import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBW2iYBruhcBbjwI3qtNtTSVa79159X1VE",
  authDomain: "xodd-2-0-0.firebaseapp.com",
  projectId: "xodd-2-0-0",
  storageBucket: "xodd-2-0-0.appspot.com",
  messagingSenderId: "1015008216192",
  appId: "1:1015008216192:web:de97547c71983ce1d61265",
  measurementId: "G-8VSK6S6D37"
};

firebase.initializeApp(firebaseConfig);

const db =  firebase.firestore() 
db.settings({timestampsInSnapshots: true})

export default db;