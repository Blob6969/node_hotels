const mongoose = require('mongoose');


const mongoURL = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL)


const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to Mongodb server');
})

db.on('error', () => {
    console.log('MongoDB connection error', err);
})

db.on('disconnected', () => {
    console.log('MongoDB is disconnected');
})

module.exports = db;