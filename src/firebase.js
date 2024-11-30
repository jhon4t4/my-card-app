
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do seu Firebase (substitua pelas suas credenciais)
const firebaseConfig = {
  apiKey: "AIzaSyAvFhZ1tvZj3V638kXNaEtVjs1cBwWDnmM",
  authDomain: "test-de-app-b45a4.firebaseapp.com",
  projectId: "test-de-app-b45a4",
  storageBucket: "test-de-app-b45a4.firebasestorage.app",
  messagingSenderId: "54435796823",
  appId: "1:54435796823:web:ebb6e5924f4004714a5012",
  measurementId: "G-4M42XX2ZRD"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha a instância do Firestore
export const db = getFirestore(app);

