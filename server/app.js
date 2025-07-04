const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { NotFoundError, errorHandler } = require("./src/middlewares/ErrorMiddleware");
const UserRoutes = require("./src/routes/UserRoute");
const ChatRoutes = require("./src/routes/ChatRoute");
const MessageRoutes = require("./src/routes/MessageRoute");
const { connectDB } = require("./src/config/db");

// Load env based on NODE_ENV
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(__dirname, `environment/.env.${env}`) });

console.log(`Environment: ${process.env.NODE_ENV}`);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Attach io instance to the app
app.set("io", io);

// Load socket handlers
require("./src/socketConnection/socket.io")(io);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/v1", UserRoutes);
app.use("/v1", ChatRoutes);
app.use("/v1", MessageRoutes);

// Error Middleware
app.use(NotFoundError);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const APP_URL = process.env.APP_BASE_URL || 'http://localhost:5000'
connectDB(server, PORT, APP_URL);