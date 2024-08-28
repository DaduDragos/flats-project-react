import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { User } from "../../types/user";
import { signOut } from "firebase/auth";

export const registerUser = async (data: User) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    console.log(userCredentials);
    await setDoc(doc(db, "users", userCredentials.user.uid), {
      uid: userCredentials.user.uid,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      favorites: [],
      role: "regular",
    });
  } catch (error) {
    console.log(error);
  }
};

export const logInUser = async (data: Partial<User>) => {
  try {
    const userDetails = await signInWithEmailAndPassword(
      auth,
      data.email as string,
      data.password as string
    );
    return getUser(userDetails.user.uid);
  } catch (error) {
    alert("Invalid credentials");
    console.log(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(docSnap.data().uid as string)
      );
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const logOutUser = async () => {
  await signOut(auth);
  localStorage.removeItem("loggedInUser");
};

export const updateUser = async (user: User) => {
  await setDoc(doc(db, "users", user.uid), {
    ...user,
    favorites: user.favorites,
  });
};

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await deleteDoc(doc(db, "users", userId));
    console.log("User deleted with ID:", userId);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
