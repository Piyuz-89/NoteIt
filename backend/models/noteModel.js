const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
    },
    {
        timestamps: true
    }
);

module.exports = new mongoose.model("Note", noteSchema);