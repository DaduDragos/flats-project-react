import { createContext } from "react";
import { AuthContextProps } from "../types/user";

export const AuthContext = createContext<AuthContextProps | null>(null);
