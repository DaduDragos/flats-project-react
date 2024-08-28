import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Flat } from "../../types/flat";

export const addNewFlat = async (data: Flat) => {
  try {
    await setDoc(doc(db, "flats", data.id), data);
    alert("Flat added successfully !");
  } catch (error) {
    console.log(error);
  }
};

export const getFlats = async (): Promise<Flat[]> => {
  const flatsArr: Flat[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "flats"));

    querySnapshot.forEach((doc) => {
      flatsArr.push({ id: doc.id, ...doc.data() } as Flat);
    });
  } catch (error) {
    console.error("Error fetching flats:", error);
  }
  return flatsArr;
};

export const getFavFlat = async (flatId: string) => {
  try {
    const docRef = doc(db, "flats", flatId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.error("Error fetching flat data:", error);
    return null;
  }
};

export const deleteFlat = async (flatId: string) => {
  try {
    await deleteDoc(doc(db, "flats", flatId));
    alert("Flat deleted !");
  } catch (error) {
    console.error("Error deleting flat", error);
  }
};

export const updateFlat = async (
  flatId: string,
  updatedData: Partial<Flat>
) => {
  try {
    const flatRef = doc(db, "flats", flatId);
    await updateDoc(flatRef, updatedData);
    alert("Flat updated !");
  } catch (error) {
    console.error("Cannot update flat !", error);
  }
};
