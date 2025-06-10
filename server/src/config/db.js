const expressAsyncHandler = require("express-async-handler");
const db = require("../models");

const connectDB = expressAsyncHandler(async (server, PORT) => {
    try {
        await db.sequelize.authenticate();
        console.log("✅ Database connected successfully");
        await db.sequelize.sync();

        server.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ DB connection failed:", error);
    }
});

module.exports = {connectDB, sequelize: db.sequelize};