const bcrypt = require('bcrypt');
const expressAsyncHandler = require('express-async-handler');
const {generateToken} = require('../middlewares/AuthMiddleware');
const db = require("../models/index");
const {createUserValidationSchema} = require('../utils/Validators');

const User = db.User;

const registerUser = expressAsyncHandler(async (req, res, next) => {
    const {email} = req.body;
    if (!req.body) {
        return res.status(400).json({error: true, message: "Request not provided"});
    }

    const validateUsersData = await createUserValidationSchema.validate(req.body, {
        abortEarly: false
    });

    const existingUser = await User.findOne({where: {email}});
    if (existingUser) {
        return res.status(400).json({
            error: true, message: "User with this email already exists."
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = await User.create({
        user_name: validateUsersData.user_name,
        email: validateUsersData.email,
        password: hashedPassword,
        role: validateUsersData.role
    });

    const accessToken = generateToken(userData.toJSON(), process.env.ACCESS_TOKEN_SECRET, process.env.JWT_ACCESS_EXPIRATION);
    const refreshToken = generateToken(userData.toJSON(), process.env.REFRESH_TOKEN_SECRET, process.env.JWT_REFRESH_EXPIRATION);

    userData.accessToken = accessToken;
    userData.refreshToken = refreshToken;
    await userData.save();

    return res.status(200).json({
        success: true, message: 'User registered successfully'
    });
});

const loginUser = expressAsyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    const checkUserExists = await User.findOne({where: {email}});
    if (!email || !password || !checkUserExists) {
        return res.status(400).json({
            error: true, message: "Invalid email or password"
        });
    }

    const userPasswordCompare = await bcrypt.compare(password, checkUserExists.password);
    if (!userPasswordCompare) {
        return res.status(400).json({
            error: true, message: "Invalid password"
        });
    }

    const accessToken = generateToken(checkUserExists.toJSON(), process.env.ACCESS_TOKEN_SECRET, process.env.JWT_ACCESS_EXPIRATION);
    const refreshToken = generateToken(checkUserExists.toJSON(), process.env.REFRESH_TOKEN_SECRET, process.env.JWT_REFRESH_EXPIRATION);

    checkUserExists.refreshToken = refreshToken;
    checkUserExists.isActive = true;
    await checkUserExists.save();

    const userData = {
        user_name: checkUserExists.user_name,
        email: checkUserExists.email,
        role: checkUserExists.role,
        isActive: checkUserExists.isActive,
    };
    console.log("userData", userData);
    return res.status(200).json({
        success: true, message: 'User logged successfully', user_details: userData
    });
});

const getAllUsers = expressAsyncHandler(async (req, res, next) => {
    const users = await User.findAll();
    if (users.length === 0) {
        return res.status(404).json({
            error: true, message: "Users not found"
        });
    }

    const usersData = users.map((user) => ({
        id: user.id, user_name: user.user_name, email: user.email, role: user.role, isActive: user.isActive
    }));

    return res.status(200).json({
        success: true, results: usersData, count: usersData.length
    });
});

const deleteUser = expressAsyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const userExists = await User.findByPk(userId);
    if (!userExists) {
        return res.status(404).json({
            error: true, message: "User not found."
        });
    }
    await userExists.destroy();
    return res.status(200).json({
        success: true, message: 'User deleted successfully'
    });
});

const getUserDetails = expressAsyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const userDetails = await User.findByPk(userId);
    if (!userDetails) {
        return res.status(404).json({
            error: true, message: "User not found."
        });
    }
    const userData = {
        id: userDetails.id,
        user_name: userDetails.user_name,
        email: userDetails.email,
        role: userDetails.role,
        isActive: userDetails.isActive,
    };

    return res.status(200).json({
        success: true, userDetails: userData
    });
});

module.exports = {
    registerUser, loginUser, getAllUsers, deleteUser, getUserDetails
};