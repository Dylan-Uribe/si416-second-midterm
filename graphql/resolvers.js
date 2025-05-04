const User = require('../model/User');
const {createToken, hashPassword, isAuthenticated } = require('./auth');
require('dotenv').config({path: 'variables.env'});

const resolvers = {
    Query: {
        me: async (_, __, context) => {
            const user = isAuthenticated(context);
            return user;
        },
    },
    Mutation:{
        registerUser: async (_, {input}) => {
            const { name, email, password } = input;
            const userExists = await User.findOne({ email });

            if (userExists) {
                throw new Error('User already exists with this email');
            }

            try {
                const hashedPassword = await hashPassword(password);
                
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                });

                return await user.save();
            }
            catch (error) {
                console.log(error);
                throw new Error('Error saving user to database');
            }
        }
    }
};

module.exports = resolvers;