const db = require("../models/index");
const expressAsyncHandler = require("express-async-handler");

const Message = db.Message;
const User = db.User;

const sendMessage = expressAsyncHandler(async (req, res) => {
    if (!req.body) {
        return res.status(400).json({success: false, message: "Request not provided."});
    }
    const {chatId, senderId, message} = req.body;
    const createdMessage = await Message.create({chatId, senderId, message});
    console.log("createdMessage", createdMessage);

    return res.status(200).json({success: true, message: "Message created"});
});

const getMessage = expressAsyncHandler(async (req, res) => {
    if (!req.params) {
        return res.status(400).json({success: false, message: "Request not provided."});
    }
    const {chatId} = req.params;
    if (!chatId) {
        return res.status(400).json({success: false, message: "No chatId provided."});
    }
    const receivedMessage = await Message.findAll({
        where: {chatId},
        attributes: ["id", "chatId", "message", "createdAt", "updatedAt"],  // this will include this fields only in response
        include: [
            {model: User, as: "sender", attributes: ["id", "user_name", "email"]},
        ]
    })
    console.log("receivedMessage", receivedMessage);
    return res.status(200).json({success: true, message: "Message received", result: receivedMessage});
})

module.exports = {sendMessage, getMessage};