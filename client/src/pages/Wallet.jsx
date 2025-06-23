import { useForm } from "react-hook-form";
import { useAddWalletItem } from "../hooks/useWallet";
import { useNavigate } from "react-router-dom";
import { FiCreditCard, FiPlus, FiArrowLeft, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export function Wallet() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const addWallet = useAddWalletItem();
  const navigate = useNavigate();
  const type = watch("type");

  const onSubmit = async (data) => {
    try {
      await addWallet.mutateAsync(data);
      toast.success("Wallet item added successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add wallet item");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4 md:p-8 pb-24"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Add Wallet Item
          </h2>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="glass-effect bg-white/30 dark:bg-gray-800/30 p-6 rounded-3xl backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl bg-green-500/10 text-green-500 mr-4">
              <FiCreditCard size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white/90">
                Secure Payment Method
              </h3>
              <p className="text-green-500/80 dark:text-green-400/80 text-sm">
                Store your payment details safely
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type *
              </label>
              <select
                {...register("type", { required: "Type is required" })}
                className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border ${
                  errors.type
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-600 focus:border-green-500"
                } focus:outline-none focus:ring-2 focus:ring-green-500/30 transition`}
              >
                <option value="">Select Wallet Type</option>
                <option value="upi">UPI</option>
                <option value="bank">Bank Account</option>
                <option value="crypto">Crypto Wallet</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Label */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Label *
              </label>
              <input
                placeholder="Eg: My UPI, SBI Account, Bitcoin Wallet"
                {...register("label", { required: "Label is required" })}
                className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border ${
                  errors.label
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-600 focus:border-green-500"
                } focus:outline-none focus:ring-2 focus:ring-green-500/30 transition`}
              />
              {errors.label && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.label.message}
                </p>
              )}
            </div>

            {/* Dynamic Fields Based on Type */}
            {type === "upi" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  UPI ID *
                </label>
                <input
                  placeholder="username@upi"
                  {...register("details.upiId", {
                    required: "UPI ID is required",
                  })}
                  className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border ${
                    errors.details?.upiId
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-600 focus:border-green-500"
                  } focus:outline-none focus:ring-2 focus:ring-green-500/30 transition`}
                />
                {errors.details?.upiId && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {errors.details.upiId.message}
                  </p>
                )}
              </div>
            )}

            {type === "bank" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bank Name *
                  </label>
                  <input
                    placeholder="State Bank of India"
                    {...register("details.bankName", {
                      required: "Bank name is required",
                    })}
                    className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border ${
                      errors.details?.bankName
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-600 focus:border-green-500"
                    } focus:outline-none focus:ring-2 focus:ring-green-500/30 transition`}
                  />
                  {errors.details?.bankName && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.details.bankName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Account Number *
                    </label>
                    <input
                      placeholder="1234567890"
                      {...register("details.accountNumber", {
                        required: "Account number is required",
                      })}
                      className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border ${
                        errors.details?.accountNumber
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-600 focus:border-green-500"
                      } focus:outline-none focus:ring-2 focus:ring-green-500/30 transition`}
                    />
                    {errors.details?.accountNumber && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                        {errors.details.accountNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      IFSC Code *
                    </label>
                    <input
                      placeholder="SBIN0001234"
                      {...register("details.ifsc", {
                        required: "IFSC code is required",
                      })}
                      className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border ${
                        errors.details?.ifsc
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-600 focus:border-green-500"
                      } focus:outline-none focus:ring-2 focus:ring-green-500/30 transition`}
                    />
                    {errors.details?.ifsc && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                        {errors.details.ifsc.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {type === "crypto" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Crypto Type *
                  </label>
                  <input
                    placeholder="BTC / ETH / USDT"
                    {...register("details.cryptoType", {
                      required: "Crypto type is required",
                    })}
                    className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border ${
                      errors.details?.cryptoType
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-600 focus:border-green-500"
                    } focus:outline-none focus:ring-2 focus:ring-green-500/30 transition`}
                  />
                  {errors.details?.cryptoType && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.details.cryptoType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Wallet Address *
                  </label>
                  <input
                    placeholder="0x..."
                    {...register("details.address", {
                      required: "Wallet address is required",
                    })}
                    className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border ${
                      errors.details?.address
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-600 focus:border-green-500"
                    } focus:outline-none focus:ring-2 focus:ring-green-500/30 transition`}
                  />
                  {errors.details?.address && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.details.address.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addWallet.isPending}
                className="px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {addWallet.isPending ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <FiPlus className="mr-2" />
                    Add Wallet
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}
