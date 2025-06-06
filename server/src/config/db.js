const expressAsyncHandler = require("express-async-handler");
const db = require("../models");

const connectDB = expressAsyncHandler(async (app, PORT) => {
    try {
        await db.sequelize.authenticate();
        console.log("✅ Database connected successfully");
        await db.sequelize.sync();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
});

module.exports = {connectDB, sequelize: db.sequelize};