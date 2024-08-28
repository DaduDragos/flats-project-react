import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps } from "../types/user";
import { getFlats } from "../api/methods/flat";
import FlatCard from "../components/FlatCard";
import { Flat } from "../types/flat";
import { FavoriteFlat } from "../types/user";

const Favorites = () => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [favoriteFlats, setFavoriteFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavoriteFlats = useCallback(async () => {
    if (!user || !user.favorites) {
      setLoading(false);
      return;
    }

    const flatIds = user.favorites.map((flat: FavoriteFlat) => flat.flatId);

    if (flatIds.length === 0) {
      setFavoriteFlats([]);
      setLoading(false);
      return;
    }

    try {
      const allFlats = await getFlats();
      const fetchedFlats = allFlats.filter((flat) => flatIds.includes(flat.id));
      setFavoriteFlats(fetchedFlats);
    } catch (error) {
      setError("Failed to fetch favorite flats");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavoriteFlats();
  }, [fetchFavoriteFlats]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gradient-to-l from-cyan-500 to-blue-500 h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {favoriteFlats.length > 0 ? (
          favoriteFlats.map((flat) =>
            flat && flat.id ? <FlatCard key={flat.id} data={flat} /> : null
          )
        ) : (
          <div>No favorite flats found</div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
