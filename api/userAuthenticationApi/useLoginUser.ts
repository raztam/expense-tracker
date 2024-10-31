import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLoginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user);
    return userCredential.user;
  } catch (error) {
    return error;
  }
};

export default useLoginUser;
