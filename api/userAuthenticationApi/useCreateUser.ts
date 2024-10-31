import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useCreateUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    return error;
  }
};

export default useCreateUser;
