import { auth } from "../firebase";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";

export const useCreateUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    const authError = error as AuthError;
    return authError.message;
  }
};

export default useCreateUser;
