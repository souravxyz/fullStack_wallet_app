import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "../hooks/useAuth";
import toast from "react-hot-toast";

export function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useChangePassword();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const newPassword = watch("newPassword", "");

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
      toast.success("Password changed successfully!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20">
          <div className="text-center mb-6">
            <div className="bg-blue-500/10 p-4 rounded-full inline-flex mb-4">
              <FiLock className="text-blue-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Change Password
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Secure your account with a new password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Old Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Current Password"
                  {...register("oldPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-white/30 dark:border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent backdrop-blur-sm placeholder-gray-500/70 dark:placeholder-gray-400/70"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showOldPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.oldPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.oldPassword.message}
                </motion.p>
              )}
            </div>

            {/* New Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-white/30 dark:border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent backdrop-blur-sm placeholder-gray-500/70 dark:placeholder-gray-400/70"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.newPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.newPassword.message}
                </motion.p>
              )}
              {newPassword && newPassword.length > 0 && (
                <div className="mt-2 h-1.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(
                        100,
                        (newPassword.length / 6) * 100
                      )}%`,
                    }}
                    className={`h-full ${
                      newPassword.length >= 6 ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center ${
                isLoading
                  ? "bg-blue-400/80 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <span>Update Password</span>
                  <FiArrowRight className="ml-2" />
                </>
              )}
            </motion.button>

            {/* Cancel Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-3 px-4 bg-transparent text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 rounded-xl border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300"
            >
              Cancel
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
