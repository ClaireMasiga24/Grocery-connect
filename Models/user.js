const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['manager', 'sales_agent']
    },
    branch: {
        type: String,
        required: true,
        enum: ['maganjo', 'matugga']
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
