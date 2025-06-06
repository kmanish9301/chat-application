const jwt = require('jsonwebtoken');

const generateToken = (payload, secret, expiresIn) => {
    if (!secret) {
        console.error("JWT secret is not defined. Check your environment variables.");
        throw new Error("JWT secret is not defined.");
    }
    return jwt.sign(payload, secret, {expiresIn});
};

module.exports = {generateToken};