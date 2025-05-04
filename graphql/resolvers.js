const User = require('../model/User');
const {createToken, hashPassword, isAuthenticated } = require('./auth');
const bcrypt = require('bcryptjs');
require('dotenv').config({path: 'variables.env'});

const resolvers = {
    Query: {
        me: async (_, __, context) => {
            const userToken = isAuthenticated(context);

            try{
                const user = await User.findById(userToken.id);
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            }
            catch (error) {
                console.error('Error fetching user:', error);
                throw new Error('Error fetching user data');
            }
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
        },

        login: async(_, {input}) => {
            const { email, password } = input;
            const user = await User.findOne({email});

            if (!user) {
                throw new Error('User not found with this email');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Incorrect password');
            }

            return {
                token: createToken(user, process.env.SECRET, '24h')
            };

        }
    }
};

module.exports = resolvers;