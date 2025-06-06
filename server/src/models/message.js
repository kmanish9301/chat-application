module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        "Message",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            chatId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {model: "Chat", key: "id"},
            },
            senderId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {model: "User", key: "id"},
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            freezeTableName: true,
        }
    );

    Message.associate = (models) => {
        Message.belongsTo(models.Chat, {foreignKey: "chatId", as: "chat"});
        Message.belongsTo(models.User, {foreignKey: "senderId", as: "sender"});
    };

    return Message;
};