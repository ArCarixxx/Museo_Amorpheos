import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBViMHSNccsMtXoWUXqZzu4POXi7yrTFyg",
  authDomain: "museobd-58426.firebaseapp.com",
  projectId: "museobd-58426",
  storageBucket: "museobd-58426.appspot.com", // 🔹 CORREGIDO
  messagingSenderId: "910638610771",
  appId: "1:910638610771:web:f1a59ec9025fb77a7749a6",
  measurementId: "G-92KQ0DE9QZ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // 🔹 Asegúrate de importar Firestore

export { db };