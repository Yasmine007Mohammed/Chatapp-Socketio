const mongoose = require('mongoose');
const User = require('../models/userModel');
const Message = require('../models/messageModel');

const conversationSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Message,
            default: []
        },
    ],
},{timestamps: true}    
);

const conversationModel = mongoose.model('Conversation', conversationSchema);
module.exports = conversationModel;