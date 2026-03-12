import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoMEvoi_uwge68PxWeW0Wi3dMyWQyta5g",
  authDomain: "hisab-rakhi-bac5b.firebaseapp.com",
  projectId: "hisab-rakhi-bac5b",
  storageBucket: "hisab-rakhi-bac5b.firebasestorage.app",
  messagingSenderId: "427879711217",
  appId: "1:427879711217:web:c474d00a963e9e8a748450"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;