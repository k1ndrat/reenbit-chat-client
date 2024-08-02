import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKbuXxAMtieL3Ix9ZuiXbpX-icN-ei2E8",
  authDomain: "fir-auth-test-9e23f.firebaseapp.com",
  projectId: "fir-auth-test-9e23f",
  storageBucket: "fir-auth-test-9e23f.appspot.com",
  messagingSenderId: "281976571130",
  appId: "1:281976571130:web:b5cf3285b62c0823c9f543",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
