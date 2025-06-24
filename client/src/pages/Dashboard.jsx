import {
  FiPlus,
  FiTrash2,
  FiEdit,
  FiCreditCard,
  FiPieChart,
  FiFileText,
  FiCopy,
  FiCheck,
  FiLogIn,
  FiUserPlus,
  FiChevronDown,
} from "react-icons/fi";
import { useWalletItems, useDeleteWalletItem } from "../hooks/useWallet";
import { useNotes, useDeleteNote } from "../hooks/useNotes";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast"; // npm install react-hot-toast
import { useUser } from "../hooks/useUser";

export function Dashboard() {
  const { data: wallet, isLoading: loadingWallet } = useWalletItems();
  const { data: notes, isLoading: loadingNotes } = useNotes();
  const deleteWalletItem = useDeleteWalletItem();
  const deleteNote = useDeleteNote();
  const [copiedItems, setCopiedItems] = useState({});
  const { data: user, isLoading: loadingUser } = useUser();
  const [expandedWalletId, setExpandedWalletId] = useState(null);

  const handleCopy = (text, itemId) => {
    navigator.clipboard.writeText(text);
    setCopiedItems({ ...copiedItems, [itemId]: true });
    toast.success("Copied to clipboard!");
    setTimeout(() => {
      setCopiedItems({ ...copiedItems, [itemId]: false });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4 md:p-8 backdrop-blur-lg relative">
      {/* Add this Auth Overlay right here */}
      <AnimatePresence>
        {!loadingUser && !user && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/30 dark:border-gray-700/30 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-xl"></div>

              <div className="relative z-10 text-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -5, 5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                >
                  <FiCreditCard className="text-white" size={32} />
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Welcome to SecureVault
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Please register or log in to access your secure wallet and
                  notes.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/register"
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      <FiUserPlus className="mr-2" />
                      Register
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      <FiLogIn className="mr-2" />
                      Login
                    </Link>
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs text-gray-400 dark:text-gray-500 mt-6"
                >
                  Your data is encrypted and secure with us
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/30 dark:bg-gray-800/30 p-6 rounded-3xl shadow-lg mb-8 backdrop-blur-xl border border-white/20 dark:border-gray-700/30"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <motion.h2 className="text-3xl font-bold text-gray-800 dark:text-white/90 mb-1">
              {loadingUser ? "Loading..." : `${user?.name || "User"}'s Wallet`}
            </motion.h2>
            <p className="text-blue-500/80 dark:text-blue-400/80 font-medium">
              Your digital vault
            </p>
          </div>
          <nav className="flex space-x-3 mt-4 md:mt-0">
            <Link
              to="/wallet/add"
              className="flex items-center px-4 py-2 bg-white/90 hover:bg-white dark:bg-gray-700/90 dark:hover:bg-gray-700 text-blue-500 dark:text-blue-400 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <FiPlus className="mr-2" /> Add Wallet
            </Link>
            <Link
              to="/notes/add"
              className="flex items-center px-4 py-2 bg-white/90 hover:bg-white dark:bg-gray-700/90 dark:hover:bg-gray-700 text-purple-500 dark:text-purple-400 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <FiPlus className="mr-2" /> Add Note
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${
          !user && !loadingUser ? "filter blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Wallet Items Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/30 dark:bg-gray-800/30 p-6 rounded-3xl backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 flex items-center">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 mr-3">
                <FiCreditCard size={20} />
              </div>
              Wallet Items
            </h3>
            <Link
              to="/family"
              className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition"
            >
              View Family
            </Link>
          </div>

          {loadingWallet ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-200/50 dark:bg-gray-700/50 h-3 w-3"></div>
                <div className="rounded-full bg-gray-200/50 dark:bg-gray-700/50 h-3 w-3"></div>
                <div className="rounded-full bg-gray-200/50 dark:bg-gray-700/50 h-3 w-3"></div>
              </div>
            </div>
          ) : wallet?.length ? (
            <div className="space-y-3">
              {wallet.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: expandedWalletId === item._id ? 1 : 1.02,
                  }}
                  className={`bg-white/50 dark:bg-gray-700/50 p-4 rounded-2xl border ${
                    expandedWalletId === item._id
                      ? "border-blue-300/50 dark:border-blue-500/30 shadow-sm"
                      : "border-white/30 dark:border-gray-600/30"
                  } transition-all cursor-pointer`}
                  onClick={() =>
                    setExpandedWalletId(
                      expandedWalletId === item._id ? null : item._id
                    )
                  }
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start w-full">
                      <div
                        className={`p-3 rounded-xl mr-4 ${
                          item.type === "upi"
                            ? "bg-green-500/10 text-green-500"
                            : item.type === "bank"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {item.type === "upi" && <FiCreditCard size={18} />}
                        {item.type === "bank" && <FiPieChart size={18} />}
                        {item.type === "crypto" && <FiPieChart size={18} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white/90">
                              {item.label}
                            </h4>
                            <span
                              className={`text-xs px-2 py-1 rounded-full mt-1 ${
                                item.type === "upi"
                                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                  : item.type === "bank"
                                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                  : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                              }`}
                            >
                              {item.type}
                            </span>
                          </div>
                          <motion.div
                            animate={{
                              rotate: expandedWalletId === item._id ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiChevronDown className="text-gray-400 ml-2" />
                          </motion.div>
                        </div>

                        {/* Details section - only shown when expanded */}
                        <AnimatePresence>
                          {expandedWalletId === item._id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {item.type === "upi" && (
                                <div className="text-sm text-gray-600 dark:text-gray-300 mt-3 pt-3 border-t border-white/20 dark:border-gray-600/20">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">UPI ID:</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy(
                                          item.details.upiId,
                                          `${item._id}-upi`
                                        );
                                      }}
                                      className="ml-2 p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-500/10 transition"
                                    >
                                      <AnimatePresence mode="wait">
                                        {copiedItems[`${item._id}-upi`] ? (
                                          <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="text-green-500"
                                          >
                                            <FiCheck size={14} />
                                          </motion.span>
                                        ) : (
                                          <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                          >
                                            <FiCopy size={14} />
                                          </motion.span>
                                        )}
                                      </AnimatePresence>
                                    </button>
                                  </div>
                                  <p className="font-mono bg-gray-100/50 dark:bg-gray-700/50 p-1.5 rounded mt-1">
                                    {item.details.upiId}
                                  </p>
                                </div>
                              )}

                              {item.type === "bank" && (
                                <div className="text-sm text-gray-600 dark:text-gray-300 mt-3 pt-3 border-t border-white/20 dark:border-gray-600/20 space-y-2">
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">Bank:</span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCopy(
                                            item.details.bankName,
                                            `${item._id}-bank`
                                          );
                                        }}
                                        className="ml-2 p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-500/10 transition"
                                      >
                                        <AnimatePresence mode="wait">
                                          {copiedItems[`${item._id}-bank`] ? (
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              exit={{ scale: 0 }}
                                              className="text-green-500"
                                            >
                                              <FiCheck size={14} />
                                            </motion.span>
                                          ) : (
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              exit={{ scale: 0 }}
                                            >
                                              <FiCopy size={14} />
                                            </motion.span>
                                          )}
                                        </AnimatePresence>
                                      </button>
                                    </div>
                                    <p className="font-mono bg-gray-100/50 dark:bg-gray-700/50 p-1.5 rounded mt-1">
                                      {item.details.bankName}
                                    </p>
                                  </div>
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">
                                        Account:
                                      </span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCopy(
                                            item.details.accountNumber,
                                            `${item._id}-account`
                                          );
                                        }}
                                        className="ml-2 p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-500/10 transition"
                                      >
                                        <AnimatePresence mode="wait">
                                          {copiedItems[
                                            `${item._id}-account`
                                          ] ? (
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              exit={{ scale: 0 }}
                                              className="text-green-500"
                                            >
                                              <FiCheck size={14} />
                                            </motion.span>
                                          ) : (
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              exit={{ scale: 0 }}
                                            >
                                              <FiCopy size={14} />
                                            </motion.span>
                                          )}
                                        </AnimatePresence>
                                      </button>
                                    </div>
                                    <p className="font-mono bg-gray-100/50 dark:bg-gray-700/50 p-1.5 rounded mt-1">
                                      {item.details.accountNumber}
                                    </p>
                                  </div>
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">IFSC:</span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCopy(
                                            item.details.ifsc,
                                            `${item._id}-ifsc`
                                          );
                                        }}
                                        className="ml-2 p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-500/10 transition"
                                      >
                                        <AnimatePresence mode="wait">
                                          {copiedItems[`${item._id}-ifsc`] ? (
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              exit={{ scale: 0 }}
                                              className="text-green-500"
                                            >
                                              <FiCheck size={14} />
                                            </motion.span>
                                          ) : (
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              exit={{ scale: 0 }}
                                            >
                                              <FiCopy size={14} />
                                            </motion.span>
                                          )}
                                        </AnimatePresence>
                                      </button>
                                    </div>
                                    <p className="font-mono bg-gray-100/50 dark:bg-gray-700/50 p-1.5 rounded mt-1">
                                      {item.details.ifsc}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {item.type === "crypto" && (
                                <div className="text-sm text-gray-600 dark:text-gray-300 mt-3 pt-3 border-t border-white/20 dark:border-gray-600/20">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">
                                      {item.details.cryptoType} Address:
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy(
                                          item.details.address,
                                          `${item._id}-crypto`
                                        );
                                      }}
                                      className="ml-2 p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-500/10 transition"
                                    >
                                      <AnimatePresence mode="wait">
                                        {copiedItems[`${item._id}-crypto`] ? (
                                          <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="text-green-500"
                                          >
                                            <FiCheck size={14} />
                                          </motion.span>
                                        ) : (
                                          <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                          >
                                            <FiCopy size={14} />
                                          </motion.span>
                                        )}
                                      </AnimatePresence>
                                    </button>
                                  </div>
                                  <p className="font-mono text-xs break-all bg-gray-100/50 dark:bg-gray-700/50 p-1.5 rounded mt-1">
                                    {item.details.address}
                                  </p>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteWalletItem.mutate(item._id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition rounded-full hover:bg-red-500/10 ml-2"
                      aria-label="Delete wallet item"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                <FiCreditCard
                  className="mx-auto text-gray-400 dark:text-gray-500 mb-3"
                  size={32}
                />
                <h4 className="text-gray-500 dark:text-gray-400 font-medium">
                  No wallet items
                </h4>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Add your first wallet item
                </p>
                <Link
                  to="/wallet/add"
                  className="inline-block mt-4 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 dark:text-blue-400 rounded-lg text-sm transition"
                >
                  Add Wallet
                </Link>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Notes Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/30 dark:bg-gray-800/30 p-6 rounded-3xl backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 flex items-center mb-6">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 mr-3">
              <FiFileText size={20} />
            </div>
            Secure Notes
          </h3>

          {loadingNotes ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-200/50 dark:bg-gray-700/50 h-3 w-3"></div>
                <div className="rounded-full bg-gray-200/50 dark:bg-gray-700/50 h-3 w-3"></div>
                <div className="rounded-full bg-gray-200/50 dark:bg-gray-700/50 h-3 w-3"></div>
              </div>
            </div>
          ) : notes?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {notes.map((note) => (
                <motion.div
                  key={note._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-2xl border border-white/30 dark:border-gray-600/30 shadow-xs hover:shadow-sm transition-all h-full"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-800 dark:text-white/90 line-clamp-1">
                      {note.title}
                    </h4>
                    <button
                      onClick={() => deleteNote.mutate(note._id)}
                      className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition rounded-full hover:bg-red-500/10"
                      aria-label="Delete note"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                  {note.image && (
                    <div className="mb-3 overflow-hidden rounded-xl">
                      <img
                        src={`http://localhost:5000${note.image}`}
                        alt="note"
                        className="w-full h-24 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {note.content}
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/20 dark:border-gray-600/20">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Last updated:{" "}
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                <FiFileText
                  className="mx-auto text-gray-400 dark:text-gray-500 mb-3"
                  size={32}
                />
                <h4 className="text-gray-500 dark:text-gray-400 font-medium">
                  No secure notes
                </h4>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Add your first secure note
                </p>
                <Link
                  to="/notes/add"
                  className="inline-block mt-4 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 dark:text-purple-400 rounded-lg text-sm transition"
                >
                  Add Note
                </Link>
              </div>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
