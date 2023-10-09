const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: [true, "Username already Exist"]
    },
    email:{
        type: String,
        required: true,
        unique: [true, "Email Already Exist"]
    },
    password:{
        type: String,
        required: true
    }
    },
    {
        timestamps: true
    }
);

module.exports = new mongoose.model("User", userSchema);