import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { Flat } from "../types/flat";
import { addNewFlat } from "../api/methods/flat";
import { uploadImage } from "../api/methods/storage";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps } from "../types/user";

const NewFlat = () => {
  const { register, handleSubmit, watch, reset } = useForm<Flat>();
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;
  const image = watch("image");

  const onSubmit = async (data: Flat) => {
    const imageUrl = await uploadImage(image[0]);

    addNewFlat({
      city: data.city,
      streetName: data.streetName,
      id: uuidv4(),
      streetNumber: Number(data.streetNumber),
      areaSize: Number(data.areaSize),
      hasAC: data.hasAC,
      yearBuilt: Number(data.yearBuilt),
      rentPrice: Number(data.rentPrice),
      dateAvailable: data.dateAvailable,
      imageUrl: imageUrl,
      userID: user?.uid,
      ownerFirstName: user?.firstName || "",
      ownerLastName: user?.lastName || "",
      ownerEmail: user?.email || "",
    });
    reset();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div>
        <form
          className="flex flex-col items-center justify-center gap-6 m-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="flex flex-col items-center gap-1">
              City:
              <input
                className="border border-3 p-2 rounded-xl"
                {...register("city")}
                type="text"
                placeholder="Enter flat's city"
              />
            </label>
            <label className="flex flex-col items-center gap-1">
              Street:
              <input
                className="border border-3 p-2 rounded-xl"
                {...register("streetName")}
                type="text"
                placeholder="Enter flat's street name"
              />
            </label>
            <label className="flex flex-col items-center gap-1">
              Street number:
              <input
                className="border border-3 p-2 rounded-xl"
                {...register("streetNumber")}
                type="number"
                placeholder="Enter flat's street number"
              />
            </label>
            <label className="flex flex-col items-center gap-1">
              Area size:
              <input
                className="border border-3 p-2 rounded-xl"
                {...register("areaSize")}
                type="number"
                placeholder="Enter flat's area size"
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col items-center gap-1">
              Has AC?
              <input className="ml-3" {...register("hasAC")} type="checkbox" />
            </label>
            <label className="flex flex-col items-center gap-1">
              Year built:
              <input
                className="border border-3 p-2 rounded-xl"
                {...register("yearBuilt")}
                type="number"
                placeholder="Enter flat's year built"
              />
            </label>
            <label className="flex flex-col items-center gap-1">
              Rent price:
              <input
                className="border border-3 p-2 rounded-xl"
                {...register("rentPrice")}
                type="number"
                placeholder="Enter flat's rent price"
              />
            </label>
            <label className="flex flex-col items-center gap-1">
              Available date:
              <input
                className="border border-3 p-2 rounded-xl"
                {...register("dateAvailable")}
                type="date"
                placeholder="Enter flat's available date"
              />
            </label>
            <input
              className="border border-3 p-2 rounded-xl mt-3"
              {...register("image")}
              type="file"
            />
          </div>
          <button
            className="bg-blue-500  hover:bg-blue-700 hover:text-black text-white font-bold py-2 px-4 rounded mt-4"
            type="submit"
          >
            Add flat
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewFlat;
