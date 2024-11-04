import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLoginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    return false;
  }
};

export default useLoginUser;
