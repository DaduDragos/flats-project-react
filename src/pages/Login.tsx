import { logInUser } from "../api/methods/user";
import { useForm } from "react-hook-form";
import { AuthContextProps, User } from "../types/user";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext) as AuthContextProps;

  const onSubmit = async (data: Partial<User>) => {
    try {
      const userCredentials = await logInUser(data);
      setUser(userCredentials as User);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <form
        className="flex flex-col items-center justify-center gap-6 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col items-center gap-1 text-xl">
          E-mail address:
          <input
            className="border border-3 p-2 rounded-xl w-64 text-center text-sm"
            {...register("email")}
            type="email"
            placeholder="Please choose an e-mail address"
          />
        </label>
        <label className="flex flex-col items-center gap-1 text-xl">
          Password:
          <input
            className="border border-3 p-2 rounded-xl w-64 text-center text-sm"
            {...register("password")}
            type="password"
            placeholder="Please choose a password"
          />
        </label>
        <button
          className="bg-blue-500  hover:bg-blue-700 hover:text-black text-white font-bold py-2 px-4 rounded mt-4"
          type="submit"
        >
          Login
        </button>
        <Link
          to="/register"
          className="text-xl text-blue-950 hover:text-green-900"
        >
          New here? Create an account !
        </Link>
      </form>
    </div>
  );
};

export default Login;
