const express = require('express');
const {sendMessage, getMessage} = require("../controllers/MessageController");
const routes = express.Router();

routes.post("/sendMessage", sendMessage);
routes.get("/getMessage/:chatId", getMessage);

module.exports = routes;