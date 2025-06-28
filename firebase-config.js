import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDETW3ev7CTTRISPRYdFsYesX1eFKzAsgE",
  authDomain: "my-project-b501e.firebaseapp.com",
  projectId: "my-project-b501e",
  storageBucket: "my-project-b501e.appspot.com",
  messagingSenderId: "94301814479",
  appId: "1:94301814479:web:2d3921b8f069858e8ec1ba",
  measurementId: "G-ZFYP85SXRN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);