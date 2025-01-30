import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-qz3VgKeVVG5_NMoUaH1VkN-RLuAINrU",
  authDomain: "login-989a6.firebaseapp.com",
  projectId: "login-989a6",
  storageBucket: "login-989a6.firebasestorage.app",
  messagingSenderId: "869104819570",
  appId: "1:869104819570:web:380d30d4ce01266ec8d1eb",
  measurementId: "G-R57Q2F4XX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication

console.log("Firebase initialized:", app.name); // Log the app name to verify initialization

export { auth };