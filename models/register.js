const mongoose = require('mongoose');
const registerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    phone : {  
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    profilePicture: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;