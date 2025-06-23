import { useForm } from "react-hook-form";
import {
  useFamily,
  useAddFamily,
  useAddFamilyWallet,
  useDeleteFamily,
} from "../hooks/useFamily";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiUserPlus,
  FiTrash2,
  FiPlus,
  FiArrowLeft,
  FiCopy,
} from "react-icons/fi";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export function Family() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { data: family = [], isLoading } = useFamily();
  const addMember = useAddFamily();
  const deleteFamily = useDeleteFamily();

  const [selected, setSelected] = useState(null);
  const walletForm = useForm();
  const addWallet = useAddFamilyWallet(selected?._id);
  const walletType = walletForm.watch("type");

  // Copy to clipboard function
  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message || "Copied to clipboard!");
  };

  const onAddMember = async (data) => {
    try {
      await addMember.mutateAsync(data);
      reset();
      toast.success("Family member added!");
    } catch (err) {
      toast.error("Failed to add family member");
    }
  };

  const onAddWallet = async (walletData) => {
    try {
      const { type, label, ...rest } = walletData;
      const details = {};

      if (type === "upi") {
        details.upiId = rest.upiId;
      } else if (type === "bank") {
        details.bankName = rest.bankName;
        details.accountNumber = rest.accountNumber;
        details.ifsc = rest.ifsc;
      } else if (type === "crypto") {
        details.cryptoType = rest.cryptoType;
        details.address = rest.address;
      }

      await addWallet.mutateAsync({ type, label, details });
      walletForm.reset();
      toast.success("Wallet added successfully!");
    } catch (err) {
      toast.error("Failed to add wallet");
    }
  };

  // Render wallet details based on type
  const renderWalletDetails = (wallet) => {
    switch (wallet.type) {
      case "upi":
        return (
          <div className="flex items-center">
            <span>{wallet.details.upiId}</span>
            <button
              onClick={() =>
                copyToClipboard(wallet.details.upiId, "UPI ID copied!")
              }
              className="ml-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
              title="Copy UPI ID"
            >
              <FiCopy size={14} />
            </button>
          </div>
        );
      case "bank":
        return (
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="font-medium">Bank:</span>
              <span className="ml-2">{wallet.details.bankName}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Account:</span>
              <span className="ml-2">{wallet.details.accountNumber}</span>
              <button
                onClick={() =>
                  copyToClipboard(
                    wallet.details.accountNumber,
                    "Account number copied!"
                  )
                }
                className="ml-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
                title="Copy account number"
              >
                <FiCopy size={14} />
              </button>
            </div>
            <div className="flex items-center">
              <span className="font-medium">IFSC:</span>
              <span className="ml-2">{wallet.details.ifsc}</span>
              <button
                onClick={() =>
                  copyToClipboard(wallet.details.ifsc, "IFSC code copied!")
                }
                className="ml-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
                title="Copy IFSC code"
              >
                <FiCopy size={14} />
              </button>
            </div>
          </div>
        );
      case "crypto":
        return (
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="font-medium">Type:</span>
              <span className="ml-2">{wallet.details.cryptoType}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Address:</span>
              <span className="ml-2 truncate">{wallet.details.address}</span>
              <button
                onClick={() =>
                  copyToClipboard(
                    wallet.details.address,
                    "Wallet address copied!"
                  )
                }
                className="ml-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
                title="Copy wallet address"
              >
                <FiCopy size={14} />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4 md:p-8 pb-24"
    >
      <Toaster position="top-right" />

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
            Family Members
          </h2>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        {/* Add Member Form */}
        <motion.form
          onSubmit={handleSubmit(onAddMember)}
          className="glass-effect bg-white/30 dark:bg-gray-800/30 p-6 rounded-3xl backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 mr-4">
              <FiUserPlus size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white/90">
                Add Family Member
              </h3>
              <p className="text-blue-500/80 dark:text-blue-400/80 text-sm">
                Store important family contacts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                placeholder="John Doe"
                {...register("name", { required: true })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Relation *
              </label>
              <input
                placeholder="Father, Mother, etc."
                {...register("relation", { required: true })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition flex items-center justify-center"
          >
            <FiUserPlus className="mr-2" />
            Add Member
          </button>
        </motion.form>

        {/* Family Members List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : family.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No family members added yet
            </div>
          ) : (
            family.map((member) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-effect bg-white/30 dark:bg-gray-800/30 p-6 rounded-3xl backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
                      {member.name}
                    </h3>
                    <p className="text-blue-500 dark:text-blue-400">
                      {member.relation}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteFamily.mutate(member._id)}
                    className="p-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition"
                    title="Delete member"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <button
                  onClick={() =>
                    setSelected(selected?._id === member._id ? null : member)
                  }
                  className="mt-4 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition flex items-center text-sm"
                >
                  <FiPlus className="mr-2" size={14} />
                  {selected?._id === member._id
                    ? "Hide Wallets"
                    : "Manage Wallets"}
                </button>

                {selected?._id === member._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {member.walletItems?.length > 0
                        ? "Wallets"
                        : "No wallets yet"}
                    </h4>

                    {member.walletItems?.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {member.walletItems.map((item, i) => (
                          <div
                            key={i}
                            className="bg-white/50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
                          >
                            <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                              {item.label}
                              <span className="ml-2 text-xs px-2 py-1 bg-blue-500/10 text-blue-500 dark:text-blue-400 rounded-full">
                                {item.type}
                              </span>
                            </div>
                            {renderWalletDetails(item)}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Wallet Form */}
                    <form onSubmit={walletForm.handleSubmit(onAddWallet)}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Wallet Type *
                          </label>
                          <select
                            {...walletForm.register("type", { required: true })}
                            className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                          >
                            <option value="">Select Wallet Type</option>
                            <option value="upi">UPI</option>
                            <option value="bank">Bank</option>
                            <option value="crypto">Crypto</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Label *
                          </label>
                          <input
                            placeholder="e.g. Dad's UPI"
                            {...walletForm.register("label", {
                              required: true,
                            })}
                            className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                          />
                        </div>

                        {walletType === "upi" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              UPI ID *
                            </label>
                            <input
                              placeholder="username@upi"
                              {...walletForm.register("upiId", {
                                required: true,
                              })}
                              className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                            />
                          </div>
                        )}

                        {walletType === "bank" && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Bank Name *
                              </label>
                              <input
                                placeholder="e.g. State Bank of India"
                                {...walletForm.register("bankName", {
                                  required: true,
                                })}
                                className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Account Number *
                                </label>
                                <input
                                  placeholder="1234567890"
                                  {...walletForm.register("accountNumber", {
                                    required: true,
                                  })}
                                  className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  IFSC Code *
                                </label>
                                <input
                                  placeholder="SBIN0001234"
                                  {...walletForm.register("ifsc", {
                                    required: true,
                                  })}
                                  className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {walletType === "crypto" && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Crypto Type *
                              </label>
                              <input
                                placeholder="e.g. BTC, ETH"
                                {...walletForm.register("cryptoType", {
                                  required: true,
                                })}
                                className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Wallet Address *
                              </label>
                              <input
                                placeholder="0x..."
                                {...walletForm.register("address", {
                                  required: true,
                                })}
                                className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                              />
                            </div>
                          </>
                        )}

                        <button
                          type="submit"
                          className="mt-2 px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition flex items-center justify-center"
                        >
                          <FiPlus className="mr-2" />
                          Add Wallet
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
