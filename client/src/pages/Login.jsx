import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.token);
        navigate("/");
      },
      onError: (err) => {
        alert(err.response?.data?.message || "Login failed");
      },
    });
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
          <div className="flex flex-col items-center mb-6">
            <motion.div whileHover={{ scale: 1.05 }} className="mb-4">
              <div className="bg-blue-500/10 p-4 rounded-full">
                <FiLogIn className="text-blue-500 text-2xl" />
              </div>
            </motion.div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Sign in to continue
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-white/30 dark:border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent backdrop-blur-sm placeholder-gray-500/70 dark:placeholder-gray-400/70"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-white/30 dark:border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent backdrop-blur-sm placeholder-gray-500/70 dark:placeholder-gray-400/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Forgot Link */}
            <div className="flex justify-end">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isPending}
              className={`w-full py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center ${
                isPending
                  ? "bg-blue-400/80 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
              }`}
            >
              {isPending ? (
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
                <FiLogIn className="mr-2" />
              )}
              {isPending ? "Logging in..." : "Login"}
            </motion.button>

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-300/50 dark:border-gray-600/50"></div>
              <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">
                OR
              </span>
              <div className="flex-grow border-t border-gray-300/50 dark:border-gray-600/50"></div>
            </div>

            {/* Register Link */}
            <div className="text-center text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  to="/register"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Register here
                </Link>
              </motion.span>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
