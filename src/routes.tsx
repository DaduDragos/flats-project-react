import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  AllUsers,
  EditFlat,
  Favorites,
  FlatView,
  Homepage,
  Login,
  MyFlats,
  NewFlat,
  Profile,
  ProfileUpdate,
  Register,
} from "./pages";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="all-users" element={<AllUsers />} />
        <Route path="edit-flat/:id" element={<EditFlat />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="my-flats" element={<MyFlats />} />
        <Route path="new-flat" element={<NewFlat />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/update" element={<ProfileUpdate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
