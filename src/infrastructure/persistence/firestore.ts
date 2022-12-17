import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { IPost, ITag } from "../schema";
import { getAuthObject } from "./auth";
import { db } from "./firebase";

const newPostRef = doc(collection(db, "posts"));
const newTagsRef = doc(collection(db, "tags"));

export async function addNewPost(value: IPost) {
  //   await addDoc(collection(db, "posts"), { ...value });
  return await setDoc(
    newPostRef,
    {
      ...value,
      timestamp: serverTimestamp(),
      createdAt: Timestamp.fromDate(new Date()),
    },
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

export async function getTags() {
  const tagQuerySnapShot = await getDocs(collection(db, "tags"));

  let tags: ITag[] = [];
  tagQuerySnapShot.forEach((item) => {
    const value = item.data() as ITag;
    tags.push(value);
  });
  return tags;
}

export async function getMyPosts() {
  const user = getAuthObject();
  const q = query(collection(db, "posts"), where("email", "==", user?.email));
  const tagQuerySnapShot = await getDocs(q);

  let posts: IPost[] = [];
  tagQuerySnapShot.forEach((item) => {
    const value = item.data() as IPost;
    posts.push(value);
  });
  return posts;
}

export async function getPostByPostId(postId: string) {
  const user = getAuthObject();
  const q = query(collection(db, "posts"), where("postId", "==", postId));
  const tagQuerySnapShot = await getDocs(q);

  let posts: IPost[] = [];
  tagQuerySnapShot.forEach((item) => {
    const value = item.data() as IPost;
    posts.push(value);
  });
  return posts[0];
}
