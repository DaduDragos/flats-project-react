import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps, User } from "../types/user";
import { useNavigate } from "react-router";
import { getAllUsers, deleteUser } from "../api/methods/user";

const AllUsers = () => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };

  const handleDelete = async (userId: string) => {
    await deleteUser(userId);
    fetchUsers();
  };

  return (
    <div className="bg-gradient-to-l from-cyan-500 to-blue-500 flex h-screen justify-center align-center">
      <div>
        <table className="mt-36">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Birth Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td className="py-2 px-4 border-b">{user.firstName}</td>
                <td className="py-2 px-4 border-b">{user.lastName}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.birthDate}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(user.uid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
