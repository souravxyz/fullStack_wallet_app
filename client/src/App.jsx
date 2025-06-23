import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Family } from "./pages/Family";
import { Notes } from "./pages/Notes";
import { Wallet } from "./pages/Wallet";
import { Navbar } from "./components/Navbar";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { ChangePassword } from "./pages/ChangePassword";

export default function App() {
  const location = useLocation();

  const hideNavbarOnRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    location.pathname.startsWith("/reset-password") && location.pathname, // hide for dynamic reset token route
  ].filter(Boolean);

  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wallet/add" element={<Wallet />} />
        <Route path="/notes/add" element={<Notes />} />
        <Route path="/family" element={<Family />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>

      {/* Conditionally show navbar */}
      {!hideNavbarOnRoutes.includes(location.pathname) && <Navbar />}
    </div>
  );
}
