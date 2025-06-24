const app = require("./app");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

// Create HTTP server
const server = http.createServer(app);
server.on("clientError", (err, socket) => {
  socket.destroy();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
