const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const {connectDB} = require("./src/config/db");
const {errorHandler, NotFoundError} = require("./src/middlewares/ErrorMiddleware");
const UserRoutes = require("./src/routes/UserRoute");
const ChatRoutes = require("./src/routes/ChatRoute");
// Load .env from /env/.env
dotenv.config({path: path.resolve(__dirname, "environment", ".env.develop")});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/v1", UserRoutes);
app.use("/v1", ChatRoutes);

// Error Middleware
app.use(NotFoundError);
app.use(errorHandler);

// DB Connection
connectDB(app, PORT);