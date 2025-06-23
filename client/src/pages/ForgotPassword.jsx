import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import apiHandler from "../api/apiHandler";
import endpoints from "../api/endpoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = async (data) => {
    try {
      await apiHandler.post(endpoints.auth.forgotPassword, data);
      toast.success("Reset link sent to your email!");
      setEmailSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 text-center">
            <div className="bg-green-500/10 p-4 rounded-full inline-flex mb-4">
              <FiMail className="text-green-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We've sent a password reset link to your email address
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-300"
            >
              Back to Login
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

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
              <FiMail className="text-blue-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Forgot Password?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Enter your email to receive a reset link
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
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
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center ${
                isSubmitting
                  ? "bg-blue-400/80 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
              }`}
            >
              {isSubmitting ? (
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
                  <span>Send Reset Link</span>
                  <FiArrowRight className="ml-2" />
                </>
              )}
            </motion.button>

            {/* Back to Login */}
            <div className="text-center pt-4">
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-block text-sm"
              >
                Remember your password? Login
              </motion.a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
