const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
