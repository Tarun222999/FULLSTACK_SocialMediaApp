import mongoose from 'mongoose'
const messgaeSchema = new mongoose.Schema({
    //a message is realted to a convo
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
    //a message is related a sender
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //msg type
    text: String,
}, { timestamps: true });

const Message = mongoose.model('Message', messgaeSchema);

export default Message;