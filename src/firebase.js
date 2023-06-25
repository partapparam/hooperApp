// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, RecaptchaVerifier } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics"

// Other SDKs for Firebase products
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8oIltDdKDVX178DLwojaCgAfJGSGG5cA",
  authDomain: "hooper-48dcd.firebaseapp.com",
  projectId: "hooper-48dcd",
  storageBucket: "hooper-48dcd.appspot.com",
  messagingSenderId: "16425850888",
  appId: "1:16425850888:web:f1251b68f75f9de23a99bd",
  measurementId: "G-RLN20KL49Y",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  {},
  auth
)
export default app
