const messageSchema = require("./message");
const mongoose = require("mongoose")
const { Schema } = mongoose

const chatSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    messages: [messageSchema.schema],
});

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;