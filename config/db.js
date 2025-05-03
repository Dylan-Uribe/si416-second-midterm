const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');
    }
    catch(error){
        console.error(`Error connecting to database:: ${error.message}`);
        process.exit(1);

    }
};

module.exports = connectDB;