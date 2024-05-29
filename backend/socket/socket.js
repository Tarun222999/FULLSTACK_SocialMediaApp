import { Server } from 'socket.io'
import http from 'http'
import express from 'express';
import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
const app = express();

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId];
};

const userSocketMap = {}


io.on('connection', (socket) => {
    console.log("user connected", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId != "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
        try {
            await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });
            await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } });
            io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })



    socket.on('join-room',(roomId,id)=>{
        console.log(`a new user with ${id} joined room ${roomId}`)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connect',id)
    })
    
    socket.on('user-toggle-audio', (userId, roomId) => {
        console.log("toggle audio")
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-toggle-audio', userId)
    })

    socket.on('user-toggle-video', (userId, roomId) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-toggle-video', userId)
    })
})

export { io, server, app }