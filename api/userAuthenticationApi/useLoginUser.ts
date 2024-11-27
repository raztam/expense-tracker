import { auth } from "../firebase";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";

export const useLoginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    const authError = error as AuthError;
    console.log(authError.code);
    return authError.code;
  }
};

export default useLoginUser;
