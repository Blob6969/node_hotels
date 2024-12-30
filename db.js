const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = 'mongodb://localhost:27017/hotels';
//const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL)


const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to Mongodb server');
})

db.on('error', (err) => {
    console.log('MongoDB connection error', err);
})

db.on('disconnected', () => {
    console.log('MongoDB is disconnected');
})

module.exports = db;