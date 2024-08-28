import AppRoutes from "./routes";
import { AuthContext } from "./providers/AuthContext";
import { User } from "./types/user";
import { useEffect, useState } from "react";
import { getUser } from "./api/methods/user";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const userData = await getUser(JSON.parse(loggedInUser));
        if (userData) {
          setUser(userData as User);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading && !user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <AppRoutes />
      </AuthContext.Provider>
    </>
  );
}

export default App;
