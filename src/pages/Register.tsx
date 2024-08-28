import { useForm } from "react-hook-form";
import { registerUser } from "../api/methods/user";
import { User } from "../types/user";
import { useNavigate } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<User>();

  const navigate = useNavigate();

  const validateAge = (birthDate: string) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return (age >= 18 && age <= 120) || "Age must be between 18 and 120.";
  };

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

    const ageError = validateAge(data.birthDate);
    if (ageError !== true) {
      setError("birthDate", { message: ageError });
      return;
    }

    const passwordError = validatePassword(data.password);
    if (passwordError !== true) {
      setError("password", { message: passwordError });
      return;
    }

    try {
      await registerUser(data);
      alert("User created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred while creating the user.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <form
        className="flex flex-col items-center justify-center gap-6 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col items-center gap-1 text-xl">
          Choose your e-mail address:
          <input
            className={`border border-3 p-2 rounded-xl w-64 text-center text-sm ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format.",
              },
            })}
            type="email"
            placeholder="Please choose an e-mail address"
          />
          {errors.email && (
            <span className="text-red-900 text-base mt-1">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-center gap-1 text-xl">
          Choose your password:
          <input
            className={`border border-3 p-2 rounded-xl w-64 text-center text-sm ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password", {
              required: "Password is required.",
              validate: validatePassword,
            })}
            type="password"
            placeholder="Please choose a password"
          />
          {errors.password && (
            <span className="text-red-900 text-base mt-1">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-center gap-1 text-xl">
          Type your first name:
          <input
            className={`border border-3 p-2 rounded-xl w-64 text-center text-sm ${
              errors.firstName ? "border-red-500" : ""
            }`}
            {...register("firstName", {
              required: "First name is required.",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters long.",
              },
            })}
            type="text"
            placeholder="Please enter your first name"
          />
          {errors.firstName && (
            <span className="text-red-900 text-base mt-1">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-center gap-1 text-xl">
          Type your last name:
          <input
            className={`border border-3 p-2 rounded-xl w-64 text-center text-sm ${
              errors.lastName ? "border-red-500" : ""
            }`}
            {...register("lastName", {
              required: "Last name is required.",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters long.",
              },
            })}
            type="text"
            placeholder="Please enter your last name"
          />
          {errors.lastName && (
            <span className="text-red-900 text-base mt-1">
              {errors.lastName.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-center gap-1 text-xl">
          Select your birthdate:
          <input
            className={`border border-3 p-2 rounded-xl w-64 text-center text-sm ${
              errors.birthDate ? "border-red-500" : ""
            }`}
            {...register("birthDate", {
              required: "Birthdate is required.",
              validate: validateAge,
            })}
            type="date"
            placeholder="Please enter your birthdate"
          />
          {errors.birthDate && (
            <span className="text-red-900 text-base mt-1">
              {errors.birthDate.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 hover:text-black text-white font-bold py-2 px-4 rounded mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
