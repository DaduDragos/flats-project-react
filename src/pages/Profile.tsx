import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps, User } from "../types/user";
import { getUser } from "../api/methods/user";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const data = await getUser(user.uid);
        setUserData(data as User);
      }
    };
    fetchUserData();
  }, [user]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex flex-col items-center justify-center gap-6 m-5 ">
        <table className=" text-black ">
          <tbody>
            <tr>
              <td className="px-4 py-2 font-semibold">Email:</td>
              <td className="px-4 py-2">{userData.email}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">First Name:</td>
              <td className="px-4 py-2">{userData.firstName}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Last Name:</td>
              <td className="px-4 py-2">{userData.lastName}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Birth Date:</td>
              <td className="px-4 py-2">{userData.birthDate}</td>
            </tr>
          </tbody>
        </table>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          onClick={() => navigate("/profile/update")}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
