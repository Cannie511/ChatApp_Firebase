import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/firestore';
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import firebase from "firebase/compat/app";
const firebaseConfig = {
  apiKey: "AIzaSyAC4vohfO8efkWcUmItElj7j9WJV1fcILk",
  authDomain: "chatapp-ee268.firebaseapp.com",
  projectId: "chatapp-ee268",
  storageBucket: "chatapp-ee268.appspot.com",
  messagingSenderId: "963223191642",
  appId: "1:963223191642:web:9bcecfcf9931260cc49863",
  measurementId: "G-6D1YNJPW5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);


// connectAuthEmulator(auth, "http://127.0.0.1:9099");
// if(window.location.hostname === "localhost"){
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }
// auth.languageCode = 'it';

export {auth, db};
export default app;