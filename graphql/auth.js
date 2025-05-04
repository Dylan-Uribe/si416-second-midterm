const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({path: 'variables.env'});

const createToken = (user, secret, expiresIn) => {
    const { id, name, email } = user;
    return jwt.sign({ id, name, email }, secret, { expiresIn });
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const isAuthenticated = (context) => {
    if (!context || !context.user) {
        throw new Error('Authentication required. Please log in.');
    }
    return { ...context.user };
}

module.exports = {
    createToken,
    hashPassword,
    isAuthenticated
};