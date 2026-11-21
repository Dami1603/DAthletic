import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./components/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Routines from "./pages/Routines.jsx";
import Exercises from "./pages/Exercises.jsx";
import Progress from "./pages/Progress.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="rutinas" element={<Routines />} />
        <Route path="ejercicios" element={<Exercises />} />
        <Route path="progreso" element={<Progress />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
