import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { FIREBASE_API_KEY } from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
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
export const auth = getAuth(app);

export const expensesUrl = "/expenses";

// Utility funcs
export const buildUserExpenseReference = (userId: string) => {
  return ref(database, expensesUrl + "/" + userId);
};

export const buildUserExpenseItemReference = (
  userId: string,
  expenseId: string
) => {
  return ref(database, `${expensesUrl}/${userId}/${expenseId}`);
};
