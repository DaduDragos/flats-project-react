import { useContext, useEffect, useState } from "react";
import { Flat } from "../types/flat";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps } from "../types/user";
import { updateUser } from "../api/methods/user";
import { Link } from "react-router-dom";
import { deleteFlat } from "../api/methods/flat";

const FlatCard = ({
  data,
  onDelete,
}: {
  data: Flat;
  onDelete: (id: string) => void;
}) => {
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const result = user?.favorites.find((flat) => flat.flatId === data.id);
    setIsFavorite(!!result);
  }, [data.id, user]);

  const addToFavorites = async (id: string) => {
    if (user) {
      const duplicate = user.favorites.findIndex((flat) => flat.flatId === id);
      if (duplicate !== -1) {
        alert("Flat already added to favorites!");
        return;
      }

      const updatedUser = {
        ...user,
        favorites: [...user.favorites, { flatId: id }],
      };
      await updateUser(updatedUser);
      setUser(updatedUser);
      setIsFavorite(true);
    }
  };

  const removeFromFavorites = async (id: string) => {
    if (user) {
      const updatedFavorites = user.favorites.filter(
        (flat) => flat.flatId !== id
      );

      const updatedUser = {
        ...user,
        favorites: updatedFavorites,
      };
      await updateUser(updatedUser);
      setUser(updatedUser);
      setIsFavorite(false);
    }
  };
  const handleDelete = async (id: string) => {
    if (user?.uid === data.userID) {
      await deleteFlat(id);
      onDelete(id);
    }
  };

  return (
    <div className="card bg-gradient-to-r from-green-300 to-green-500 rounded-lg shadow-lg p-6 text-center">
      <img
        src={data.imageUrl}
        alt="flat_image"
        className="w-full h-40 object-cover rounded-md mb-4 hover:scale-105 transition-transform duration-300 ease-in-out"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{data.city}</h1>
      <div className="text-base text-gray-700 space-y-2">
        <p>
          <span className="font-semibold">Owner:</span> {data.ownerFirstName}{" "}
          {data.ownerLastName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {data.ownerEmail}
        </p>
        <p>
          <span className="font-semibold">Street:</span> {data.streetName}
        </p>
        <p>
          <span className="font-semibold">Street number:</span>{" "}
          {data.streetNumber}
        </p>
        <p>
          <span className="font-semibold">Area size:</span> {data.areaSize} m²
        </p>
        <p>
          <span className="font-semibold">Has AC?:</span>{" "}
          {data.hasAC ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-semibold">Year built:</span> {data.yearBuilt}
        </p>
        <p>
          <span className="font-semibold">Rent price:</span> {data.rentPrice}{" "}
          EUR
        </p>
        <p>
          <span className="font-semibold">Date available:</span>{" "}
          {new Date(data.dateAvailable).toDateString()}
        </p>
      </div>
      <div className="card-actions flex flex-col items-center mt-6 space-y-3">
        {isFavorite ? (
          <button
            className="btn bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            onClick={() => removeFromFavorites(data.id)}
          >
            Remove from Favorites
          </button>
        ) : (
          <button
            className="btn bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            onClick={() => addToFavorites(data.id)}
          >
            Add to Favorites
          </button>
        )}
        {user?.uid === data.userID && (
          <div className="flex space-x-3">
            <Link
              to={`/edit-flat/${data.id}`}
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Edit Flat
            </Link>
            <button
              className="btn bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              onClick={() => handleDelete(data.id)}
            >
              Delete Flat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlatCard;
