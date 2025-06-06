const express = require('express');
const {createChat, getAllChats, deleteChat} = require("../controllers/ChatController");
const routes = express.Router();

routes.post('/create_chat', createChat);
routes.get('/getChats/:usedId', getAllChats);
routes.delete('/deleteChat/:chatId', deleteChat);

module.exports = routes;