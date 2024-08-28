import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (image: File) => {
  const storageRef = ref(storage, `flats/${uuidv4()}-${image.name}`);
  await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);
  return url;
};
