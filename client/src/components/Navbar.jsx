import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCreditCard,
  FiFileText,
  FiUsers,
  FiLogOut,
  FiMail,
  FiUser,
  FiKey,
} from "react-icons/fi";
import getImageUrl from "../utils/getImageUrl";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import apiHandler from "../api/apiHandler";
import endpoints from "../api/endpoints";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [showProfile, setShowProfile] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await apiHandler.get(endpoints.auth.logout);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="glass-effect fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl p-2 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30 z-50">
      <div className="flex items-center justify-around space-x-2 relative">
        {/* Home */}
        <Link
          to="/"
          className={`p-3 rounded-xl ${
            isActive("/")
              ? "bg-blue-500/10 text-blue-500"
              : "text-gray-600 dark:text-gray-400 hover:bg-white/20"
          }`}
        >
          <FiHome size={20} />
        </Link>

        {/* Wallet */}
        <Link
          to="/wallet/add"
          className={`p-3 rounded-xl ${
            isActive("/wallet/add")
              ? "bg-green-500/10 text-green-500"
              : "text-gray-600 dark:text-gray-400 hover:bg-white/20"
          }`}
        >
          <FiCreditCard size={20} />
        </Link>

        {/* Profile Button */}
        <div
          className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg hover:scale-110 transition-all cursor-pointer relative"
          onClick={() => setShowProfile(!showProfile)}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={getImageUrl(user?.profilePic)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Popup */}
        {showProfile && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md w-64 z-50 border dark:border-gray-700">
            <div className="flex flex-col items-center space-y-2 text-center">
              <img
                src={getImageUrl(user?.profilePic)}
                alt="User"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-sm text-gray-800 dark:text-white flex items-center gap-2">
                <FiUser /> {user?.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <FiMail /> {user?.email}
              </div>

              {/* Reset Password */}
              <Link
                to="/change-password"
                onClick={() => setShowProfile(false)}
                className="text-blue-500 hover:underline flex items-center gap-1 text-sm"
              >
                <FiKey /> Change Password
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline flex items-center gap-1"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </div>
        )}

        {/* Notes */}
        <Link
          to="/notes/add"
          className={`p-3 rounded-xl ${
            isActive("/notes/add")
              ? "bg-purple-500/10 text-purple-500"
              : "text-gray-600 dark:text-gray-400 hover:bg-white/20"
          }`}
        >
          <FiFileText size={20} />
        </Link>

        {/* Family */}
        <Link
          to="/family"
          className={`p-3 rounded-xl ${
            isActive("/family")
              ? "bg-amber-500/10 text-amber-500"
              : "text-gray-600 dark:text-gray-400 hover:bg-white/20"
          }`}
        >
          <FiUsers size={20} />
        </Link>
      </div>
    </nav>
  );
}
