const express = require('express');
const {
    deleteUser,
    getAllUsers,
    getUserDetails,
    loginUser,
    registerUser,
    logoutUser
} = require('../controllers/UserController');

const routes = express.Router();

routes.post('/register', registerUser);
routes.post('/login', loginUser);
routes.post('/logout', logoutUser);
routes.get('/users', getAllUsers);
routes.delete('/users/:id', deleteUser);
routes.get('/users/:id', getUserDetails);

module.exports = routes;