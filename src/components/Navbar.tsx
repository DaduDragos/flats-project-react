import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../api/methods/user";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps } from "../types/user";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;

  const handleLogOut = async () => {
    try {
      await logOutUser();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return null;
  }
  return (
    <div className="flex justify-between p-3 bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="text-white text-xl">Hello, {user.firstName} !</div>
      <div className="flex justify-between gap-10 ml-9 ">
        <Link to="/" className="text-white text-xl hover:text-black">
          Home
        </Link>
        <Link to="/profile" className="text-white text-xl hover:text-black">
          My Profile
        </Link>
        <Link to="/my-flats" className="text-white text-xl hover:text-black">
          My Flats
        </Link>
        <Link to="/favorites" className="text-white text-xl hover:text-black">
          Favorites
        </Link>
        {user.role === "admin" && (
          <>
            <Link
              to="/all-users"
              className="text-white text-xl hover:text-black"
            >
              All Users
            </Link>
          </>
        )}
      </div>
      <button
        onClick={handleLogOut}
        className="text-white text-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 "
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
