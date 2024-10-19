import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCPAXNCeOXc7J1V8_eqhHiMMWWgTcUbEL8",
  authDomain: "expenses-tracker-d30eb.firebaseapp.com",
  databaseURL:
    "https://expenses-tracker-d30eb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "expenses-tracker-d30eb",
  storageBucket: "expenses-tracker-d30eb.appspot.com",
  messagingSenderId: "36287941623",
  appId: "1:36287941623:web:e6864b94b84bf078d0bcf2",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

//Expenses ref
export const expensesUrl = "/expanses";
export const expensesRef = ref(database, "/expanses");
