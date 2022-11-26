import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { getFirestore } from "firebase/firestore";  
import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'

const app = initializeApp({
    apiKey: "AIzaSyCbJKP5E1ONGVMGDCl0dKifUT62EctCWLE",
    authDomain: "realtime-chat-59549.firebaseapp.com",
    projectId: "realtime-chat-59549",
    storageBucket: "realtime-chat-59549.appspot.com",
    messagingSenderId: "812528205465",
    appId: "1:812528205465:web:667806d3dde4634c7e8208",
    measurementId: "G-1QNLFW8MNR"
})

export const Context = createContext();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const firestore = getStorage(app)
if(document.getElementById('chat-list')) {
    console.log(document.getElementById('chat-list').scrollHeight);
}
if(document.getElementById('chat-list')) {
    console.log(document.getElementById('chat-list').scrollTop);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
        app, auth, firestore, db
    }}>
        <App />
    </Context.Provider>
  </React.StrictMode>
);