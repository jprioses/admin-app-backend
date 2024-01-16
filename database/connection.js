const mongoose = require('mongoose');

//mongodb://localhost:27017/pemberty-admin-app
//mongodb+srv://jpriosescobar:1037634540@cluster0.fmjhghl.mongodb.net/pemberty-admin-app

const connection = async() => {
    try {
        await mongoose.connect('mongodb+srv://jpriosescobar:1037634540@cluster0.fmjhghl.mongodb.net/pemberty-admin-app');
        console.log('Connected to database Pemberty aminApp');
    } catch (error) {
        console.log('here')
        throw new Error(error);
    }
};

module.exports = connection;