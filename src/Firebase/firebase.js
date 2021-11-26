import {initializeApp} from 'firebase/app'
import { getFirestore, collection, getDocs, query, addDoc, where, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBW2iYBruhcBbjwI3qtNtTSVa79159X1VE",
  authDomain: "xodd-2-0-0.firebaseapp.com",
  projectId: "xodd-2-0-0",
  storageBucket: "xodd-2-0-0.appspot.com",
  messagingSenderId: "1015008216192",
  appId: "1:1015008216192:web:de97547c71983ce1d61265",
  measurementId: "G-8VSK6S6D37"
};

const app = initializeApp(firebaseConfig);

const db =  getFirestore(app) 

export const queryData = async (_collection, ...params) => {
  const dataQuery = query(
    collection(db, _collection),
    where(...params)
  )

  const querySnapshot = await getDocs(dataQuery);
  return querySnapshot
}

export const addDocument = async (_collection, data) => {
  const docRef = await addDoc(collection(db, _collection), data)
  return docRef
}

export const setDocument = async (_collection, documentID, data) => {
  const response = await setDoc(doc(db, _collection, documentID), data);
  return response
}