module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("admin", "user"),
            defaultValue: "user",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        refreshToken: {
            type: DataTypes.TEXT,
        },
    }, {
        freezeTableName: true, // important
        timestamps: true,
    });

    return User;
};
