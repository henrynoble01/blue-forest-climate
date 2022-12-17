import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

export function getAuthObject() {
  let userObj: User | null = auth.currentUser;

  return userObj;
}
