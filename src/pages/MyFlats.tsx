import { Link, useNavigate } from "react-router-dom";
import FlatCard from "../components/FlatCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps } from "../types/user";
import { Flat } from "../types/flat";
import { getFlats } from "../api/methods/flat";

const MyFlats = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [flats, setFlats] = useState<Flat[]>([]);

  const fetchFlats = async () => {
    const fetchedFlats = await getFlats();
    const usersFlats = fetchedFlats.filter(
      (flat: Flat) => flat.userID === user?.uid
    );
    setFlats(usersFlats);
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("loggedInUser") as string)) {
      navigate("/login");
    }
    fetchFlats();
  }, [user, navigate]);

  const handleDelete = (id: string) => {
    setFlats(flats.filter((flat) => flat.id !== id));
  };

  return (
    <div className="bg-gradient-to-l from-cyan-500 to-blue-500 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {flats.map((flat) => (
          <FlatCard key={flat.id} data={flat} onDelete={handleDelete} />
        ))}
      </div>
      <div className="flex justify-center p-4">
        <Link
          to="/new-flat"
          className="text-white text-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center"
        >
          Add new flat
        </Link>
      </div>
    </div>
  );
};

export default MyFlats;
