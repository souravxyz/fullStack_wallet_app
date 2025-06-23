const getImageUrl = (fileName) => {
  if (!fileName) return "https://www.gravatar.com/avatar/default?s=200";
  return `http://localhost:5000/uploads/${fileName}`;
};

export default getImageUrl;
