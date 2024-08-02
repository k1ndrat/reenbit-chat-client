import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import { LoginFormValues } from "../types/LoginFormValues";

export const doCreateUserWithEmailAndPassword = async ({
  email,
  password,
}: LoginFormValues) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const res = signInWithEmailAndPassword(auth, email, password);

  console.log((await res).user.getIdTokenResult());

  return res;
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};
