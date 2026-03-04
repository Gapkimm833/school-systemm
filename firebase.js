import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCuTxNmgd5QFaZHs-dzhs3aS-mtsyxCjls",
  authDomain: "swrscheckgrade.firebaseapp.com",
  projectId: "swrscheckgrade",
  storageBucket: "swrscheckgrade.firebasestorage.app",
  messagingSenderId: "1020329728676",
  appId: "1:1020329728676:web:67e8018bcaf09521832431",
  measurementId: "G-L1CEFTYP0C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };