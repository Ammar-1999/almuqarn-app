import { initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBEs3hLqiIiAl7DdlETOS3yKurPXSE4Cag",
  projectId: "try-e4215",
  messagingSenderId: "876552599506",
  appId: "1:876552599506:web:002ff82b4d904a4e643a0b"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();