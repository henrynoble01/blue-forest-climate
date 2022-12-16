import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { IPost, ITag } from "../schema";
import { db } from "./firebase";

const newPostRef = doc(collection(db, "posts"));
const newTagsRef = doc(collection(db, "tags"));

export async function addNewPost(value: IPost) {
  //   await addDoc(collection(db, "posts"), { ...value });
  return await setDoc(
    newPostRef,
    { ...value },
    {
      merge: true,
    }
  );
}

export async function addNeTag(value: ITag) {
  return await setDoc(
    newTagsRef,
    { ...value },
    {
      merge: true,
    }
  );
}

const tagQuery = query(collection(db, "tags"), where("label", "!=", ""));

export const tagQuerySnapShot = await getDocs(collection(db, "tags"));

export function getTags() {
  let tags: ITag[] = [];
  tagQuerySnapShot.forEach((item) => {
    const value = item.data() as ITag;
    tags.push(value);
  });
  return tags;
}
