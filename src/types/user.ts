export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: number;
  favorites: FavoriteFlat[];
  uid: string;
  role: "regular" | "admin";
}

export interface FavoriteFlat {
  flatId: string;
}

export interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
