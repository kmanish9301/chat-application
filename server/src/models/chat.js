module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define(
        "Chat",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            senderId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "User",
                    key: "id",
                },
            },
            receiverId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "User",
                    key: "id",
                },
            },
        },
        {
            timestamps: true,
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            freezeTableName: true,
        }
    );

    Chat.associate = (models) => {
        Chat.belongsTo(models.User, {foreignKey: "senderId", as: "sender"});
        Chat.belongsTo(models.User, {foreignKey: "receiverId", as: "receiver"});
        Chat.hasMany(models.Message, {foreignKey: "chatId", as: "messages"});
    };

    return Chat;
};