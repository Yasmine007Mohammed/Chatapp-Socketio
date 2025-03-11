const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');

const apiError = require('../utils/apiError');

exports.createConversation = asyncHandler(async(req,res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });
    const conversation = await newConversation.save();
    res.status(201).json({data: conversation});
});

exports.userConversations = asyncHandler(async(req,res,next) => {
    const id = req.params.userId;
    const conversation = await Conversation.findOne({
        members:{$in: [`${id}`]}
    });
    if(!conversation){
        return next(new apiError(`Conversation is not found on id ${id}`, 404))
    }
    res.status(200).json({data: conversation});
});

exports.findConversation = asyncHandler(async(req,res,next) => {
    const conversation = await Conversation.findOne({
        members: {$all: [req.params.senderId, req.params.receiverId]}
    });
    if(!conversation){
        return next(new apiError(`Conversation is not found `, 404))
    }
    res.status(200).json({data: conversation});
})