import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps, User } from "../types/user";
import { getUser, updateUser } from "../api/methods/user";
import { useNavigate } from "react-router";

const ProfileUpdate = () => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [userData, setUserData] = useState<User | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<User>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const data = await getUser(user.uid);
        setUserData(data as User);
        setValue("email", data?.email);
        setValue("firstName", data?.firstName);
        setValue("lastName", data?.lastName);
        setValue("birthDate", data?.birthDate);
      }
    };
    fetchUserData();
  }, [user, setValue]);

  const validatePassword = (password: string) => {
    const minLength = 6;
    const passLetter = /[a-zA-Z]/.test(password);
    const passNumbers = /\d/.test(password);
    const passSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passLengthCheck = password.length >= minLength;

    if (!passLengthCheck) return "Password must be at least 6 characters long.";
    if (!passLetter) return "Password must contain at least one letter.";
    if (!passNumbers) return "Password must contain at least one number.";
    if (!passSpecialCharacter)
      return "Password must contain at least one special character.";
    return true;
  };

  const onSubmit = async (data: User) => {
    clearErrors();

    if (data.password && validatePassword(data.password) !== true) {
      setError("password", { message: validatePassword(data.password) });
      return;
    }

    try {
      await updateUser({ ...userData, ...data });
      alert("User updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the user.");
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <form
        className="flex flex-col items-center justify-center gap-6 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col items-center gap-1 text-xl">
          Email:
          <input
            className="border border-3 p-2 rounded-xl w-64 text-center text-sm"
            {...register("email", { required: "Email is required." })}
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-900 text-base mt-1">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-center gap-1 text-xl">
          First Name:
          <input
            className="border border-3 p-2 rounded-xl w-64 text-center text-sm"
            {...register("firstName", { required: "First name is required." })}
            type="text"
            placeholder="First Name"
          />
          {errors.firstName && (
            <span className="text-red-900 text-base mt-1">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-center gap-1 text-xl">
          Last Name:
          <input
            className="border border-3 p-2 rounded-xl w-64 text-center text-sm"
            {...register("lastName", { required: "Last name is required." })}
            type="text"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span className="text-red-900 text-base mt-1">
              {errors.lastName.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-center gap-1 text-xl">
          Birth Date:
          <input
            className="border border-3 p-2 rounded-xl w-64 text-center text-sm"
            {...register("birthDate", { required: "Birthdate is required." })}
            type="date"
            placeholder="Birth Date"
          />
          {errors.birthDate && (
            <span className="text-red-900 text-base mt-1">
              {errors.birthDate.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-center gap-1 text-xl">
          New Password:
          <input
            className="border border-3 p-2 rounded-xl w-64 text-center text-sm"
            {...register("password", { validate: validatePassword })}
            type="password"
            placeholder="New Password"
          />
          {errors.password && (
            <span className="text-red-900 text-base mt-1">
              {errors.password.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
