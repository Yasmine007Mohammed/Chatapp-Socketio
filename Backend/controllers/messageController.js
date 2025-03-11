const asyncHandler = require('express-async-handler');

const { getReceiverSocketId, io } = require('../socketio/socket');
const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');



exports.sendMessage = asyncHandler(async(req,res,next) =>{
    const {id: receiverId} = req.params;
    const senderId = req.user._id ;
    const {message} = req.body;

    let conversation = await Conversation.findOne({
        members: {$all: [senderId,receiverId] },
    });
    if(!conversation){
        conversation = await Conversation.create({
            members: [senderId, receiverId],
        });
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message 
    });
    if(newMessage){
        conversation.messages.push(newMessage._id) ;
    }
    
    await conversation.save();
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("new message", newMessage);
    }
    
    res.status(201).json({data: newMessage });
});

exports.getMessages = asyncHandler(async(req,res,next) => {
    const {id: chatUser} = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
        members: {$all: [senderId, chatUser]}
    }).populate("messages");

    if(!conversation){
        return res.status(201).json([]);
    }
    
    const messages = conversation.messages;
    res.status(200).json(messages)
})

