const db = require("../models/index");
const expressAsyncHandler = require("express-async-handler");
const {Op} = require("sequelize");

const Chat = db.Chat;
const User = db.User;

const createChat = expressAsyncHandler(async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            error: true, message: "Request not provided."
        })
    }
    const {senderId, receiverId} = req.body;
    const chat = await Chat.create({senderId, receiverId});
    return res.status(200).json({success: true, message: "Chat created successfully.", chats: [chat]});
})

const getAllChats = expressAsyncHandler(async (req, res) => {
    const {usedId} = req.params;
    const chats = await Chat.findAll({
        where: {
            [Op.or]: [
                {senderId: usedId},
                {receiverId: usedId},
            ]
        },
        include: [
            {model: User, as: 'sender', attributes: ['id', 'user_name', 'email']},
            {model: User, as: 'receiver', attributes: ['id', 'user_name', 'email']}
        ],
        order: [['createdAt', 'DESC']],
    });

    if (chats.length === 0) {
        return res.status(404).json({
            error: true, message: "No chats found."
        })
    }
    return res.status(200).json({success: true, chats: chats});
})

const deleteChat = expressAsyncHandler(async (req, res) => {
    const {chatId} = req.params;
    const chat = await Chat.findByPk(chatId);
    if (!chat) {
        return res.status(404).json({
            error: true, message: "Chat not found."
        })
    }
    await chat.destroy();
    return res.status(200).json({success: true, message: "Chat deleted successfully."});
})

module.exports = {createChat, getAllChats, deleteChat};