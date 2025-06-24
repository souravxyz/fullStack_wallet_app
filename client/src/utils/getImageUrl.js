const getImageUrl = (filePath) => {
  if (!filePath) return "https://www.gravatar.com/avatar/default?s=200";

  // If full URL already included, return as is
  if (filePath.startsWith("http")) return filePath;

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  return `${baseUrl}${filePath}`;
};

export default getImageUrl;
