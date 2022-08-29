import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2n5a3XwVs87VYst1LeJ3JcDMeqZeUyUo",
  authDomain: "cozumeltaxiapp.firebaseapp.com",
  projectId: "cozumeltaxiapp",
  storageBucket: "uber-clone-a2e7b.appspot.com",
  messagingSenderId: "351644027420",
  appId: "1:351644027420:web:1c7bffcd2158cec676add9"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
const auth = getAuth()

export { app, provider, auth }
