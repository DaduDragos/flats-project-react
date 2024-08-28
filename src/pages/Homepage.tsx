import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthContext";

import { getFlats } from "../api/methods/flat";
import { Flat } from "../types/flat";
import { AuthContextProps } from "../types/user";
import FlatCard from "../components/FlatCard";

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [flats, setFlats] = useState<Flat[]>([]);
  const [searchFlatByWord, setSearchFlatByWord] = useState("");
  const [filteredFlats, setFilteredFlats] = useState<Flat[]>([]);

  const fetchFlats = async () => {
    const fetchedFlats = await getFlats();
    setFlats(fetchedFlats);
    setFilteredFlats(fetchedFlats);
  };

  const handleSearch = () => {
    if (searchFlatByWord === "") {
      setFilteredFlats(flats);
    } else {
      const filtered = flats.filter((flat) =>
        flat.city.toLowerCase().includes(searchFlatByWord.toLowerCase())
      );
      setFilteredFlats(filtered);
    }
  };

  const handleSort = (option: string) => {
    const sortedFlats = [...filteredFlats];
    if (option === "city") {
      sortedFlats.sort((a, b) => a.city.localeCompare(b.city));
    } else if (option === "minprice") {
      sortedFlats.sort((a, b) => a.rentPrice - b.rentPrice);
    } else if (option === "maxprice") {
      sortedFlats.sort((a, b) => b.rentPrice - a.rentPrice);
    } else if (option === "minarea") {
      sortedFlats.sort((a, b) => a.areaSize - b.areaSize);
    } else if (option === "maxarea") {
      sortedFlats.sort((a, b) => b.areaSize - a.areaSize);
    }
    setFilteredFlats(sortedFlats);
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("loggedInUser") as string)) {
      navigate("/login");
    }
    fetchFlats();
  }, [user, navigate]);

  useEffect(() => {
    handleSearch();
  }, [searchFlatByWord, flats]);

  return (
    <>
      <div className="bg-gradient-to-l from-cyan-500 to-blue-500 flex justify-end p-4 gap-3">
        <input
          type="text"
          placeholder="Search flats..."
          className="text-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          onChange={(e) => {
            setSearchFlatByWord(e.target.value);
          }}
        />
        <select
          className="text-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          onChange={(e) => {
            handleSort(e.target.value);
          }}
        >
          <option value="">Sort By:</option>
          <option value="city">City</option>
          <option value="minprice">Rent price (ascending)</option>
          <option value="maxprice">Rent price (descending)</option>
          <option value="minarea">Area size (ascending)</option>
          <option value="maxarea">Area size (descending)</option>
        </select>
      </div>
      <div className="bg-gradient-to-l from-cyan-500 to-blue-500 h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {filteredFlats.map((flat) => (
            <FlatCard key={flat.id} data={flat} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
