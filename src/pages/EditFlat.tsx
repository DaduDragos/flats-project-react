import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getFlats, updateFlat } from "../api/methods/flat";
import { Flat } from "../types/flat";

const EditFlat = () => {
  const { id } = useParams();
  const [flat, setFlat] = useState<Flat>({
    id: "",
    city: "",
    streetName: "",
    streetNumber: 0,
    areaSize: 0,
    hasAC: false,
    yearBuilt: 0,
    rentPrice: 0,
    dateAvailable: "",
    imageUrl: "",
    userID: "",
    ownerFirstName: "",
    ownerLastName: "",
    ownerEmail: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const fetchedFlat = await getFlats(id);
        setFlat(fetchedFlat[0]);
      } catch (error) {
        setError("Failed to get flat", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlat();
  }, [id]);

  const handleUpdate = async (updatedFlat: Flat) => {
    try {
      await updateFlat(updatedFlat.id, updatedFlat);
      alert("Flat updated !");
    } catch (error) {
      alert("Cannot update flat !");
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div>
        {flat && (
          <form
            className="flex flex-col items-center justify-center gap-2 m-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(flat);
            }}
          >
            <div>
              <label className="flex flex-col items-center gap-1">
                City:
                <input
                  className="border border-3 p-2 rounded-xl"
                  type="text"
                  value={flat.city}
                  onChange={(e) => setFlat({ ...flat, city: e.target.value })}
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col items-center gap-1">
                Street Name:
                <input
                  className="border border-3 p-2 rounded-xl"
                  type="text"
                  value={flat.streetName}
                  onChange={(e) =>
                    setFlat({ ...flat, streetName: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col items-center gap-1">
                Street Number:
                <input
                  className="border border-3 p-2 rounded-xl"
                  type="number"
                  value={flat.streetNumber}
                  onChange={(e) =>
                    setFlat({ ...flat, streetNumber: Number(e.target.value) })
                  }
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col items-center gap-1">
                Area Size:
                <input
                  className="border border-3 p-2 rounded-xl"
                  type="number"
                  value={flat.areaSize}
                  onChange={(e) =>
                    setFlat({ ...flat, areaSize: Number(e.target.value) })
                  }
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col items-center gap-1">
                Has AC:
                <input
                  className="border border-3 p-2 rounded-xl"
                  type="checkbox"
                  checked={flat.hasAC}
                  onChange={(e) =>
                    setFlat({ ...flat, hasAC: e.target.checked })
                  }
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col items-center gap-1">
                Year Built:
                <input
                  className="border border-3 p-2 rounded-xl"
                  type="number"
                  value={flat.yearBuilt}
                  onChange={(e) =>
                    setFlat({ ...flat, yearBuilt: Number(e.target.value) })
                  }
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col items-center gap-1">
                Rent Price:
                <input
                  className="border border-3 p-2 rounded-xl"
                  type="number"
                  value={flat.rentPrice}
                  onChange={(e) =>
                    setFlat({ ...flat, rentPrice: Number(e.target.value) })
                  }
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col items-center gap-1">
                Date Available:
                <input
                  className="border border-3 p-2 rounded-xl"
                  type="date"
                  value={flat.dateAvailable}
                  onChange={(e) =>
                    setFlat({ ...flat, dateAvailable: e.target.value })
                  }
                />
              </label>
            </div>
            <button
              className="bg-blue-500  hover:bg-blue-700 hover:text-black text-white font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Update Flat
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditFlat;
