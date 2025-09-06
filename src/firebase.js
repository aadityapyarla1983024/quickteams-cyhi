import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB28KwHOCgWedsVJesIdsH_Mgz2B9b1hgA",
  authDomain: "quickteams-cyhi.firebaseapp.com",
  projectId: "quickteams-cyhi",
  storageBucket: "quickteams-cyhi.appspot.com",
  messagingSenderId: "540112608792",
  appId: "1:540112608792:web:7fb272631ebc951a96ed6d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
