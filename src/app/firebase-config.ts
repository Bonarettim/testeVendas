// src/firebase-config.ts

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
//   databaseURL: 'https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_PROJECT_ID.appspot.com',
//   messagingSenderId: 'YOUR_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

const firebaseConfig = {
  apiKey: "AIzaSyCIsj86ZRG_sWgUX8-E5cHeepDbq5wiAu8",
  authDomain: "vendas-e3cb7.firebaseapp.com",
  databaseURL: "https://vendas-e3cb7-default-rtdb.firebaseio.com",
  projectId: "vendas-e3cb7",
  storageBucket: "vendas-e3cb7.appspot.com",
  messagingSenderId: "633283526953",
  appId: "1:633283526953:web:614f4028dc74cc4f267738",
  measurementId: "G-0ZYSSJGX6H"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o banco de dados
const database = getDatabase(app);

export { app, database };
