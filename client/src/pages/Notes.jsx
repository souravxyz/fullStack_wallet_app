import { useForm } from "react-hook-form";
import { useAddNote } from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";
import { FiFileText, FiUpload, FiSave, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export function Notes() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const addNote = useAddNote();
  const navigate = useNavigate();
  const imagePreview = watch("image")?.[0];

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await addNote.mutateAsync(formData);
      toast.success("Note added successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add note");
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4 md:p-8"
      >
        <div className="max-w-2xl mx-auto">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="bg-white/30 dark:bg-gray-800/30 p-6 rounded-3xl backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-lg"
          >
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 mr-4">
                <FiFileText size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                  Add Secure Note
                </h2>
                <p className="text-purple-500/80 dark:text-purple-400/80 text-sm">
                  Store sensitive information safely
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  placeholder="Eg: ATM PIN, Work Passwords"
                  className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border ${
                    errors.title
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-600 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  {...register("content")}
                  placeholder="Type something here..."
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Screenshot / Image (optional)
                </label>
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-purple-500 transition group">
                      <div className="flex flex-col items-center justify-center">
                        <FiUpload className="text-gray-400 dark:text-gray-500 group-hover:text-purple-500 mb-2 text-2xl" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-purple-500">
                          {imagePreview
                            ? imagePreview.name
                            : "Click to upload image"}
                        </p>
                        {imagePreview && (
                          <div className="mt-4 w-full max-h-40 overflow-hidden rounded-lg">
                            <img
                              src={URL.createObjectURL(imagePreview)}
                              alt="Preview"
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        {...register("image")}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </label>
                </div>
              </div>

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
                  disabled={addNote.isPending}
                  className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {addNote.isPending ? (
                    <>
                      <FiLoader className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" />
                      Save Note
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
