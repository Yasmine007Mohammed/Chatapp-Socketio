const {Server} = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:8001",
        methods: ['GET','POST'],
        credentials: true

    }
});

// Realtime message code goes here
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = { } // used to store Online Users

io.on("connection", (socket) => {
    console.log("A user is connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    // used to send events to all the connected users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
    socket.on("disconnect", () => {
        console.log("User is disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
});

module.exports = {app, server, io, getReceiverSocketId}