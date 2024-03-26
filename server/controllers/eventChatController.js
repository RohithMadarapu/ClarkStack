const ChatModel = require("../models/eventChat");

const getChat = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const chat = await ChatModel.findOne({ eventId });

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found for the given eventId' });
        }

        const messages = chat.messages || [];

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const addMessageToChat = async (req, res) => {
    try {
        const { eventId, userId, content } = req.body;

        const chat = await ChatModel.findOneAndUpdate(
            { eventId },
            { $push: { messages: { senderId: userId, content } } },
            { new: true, upsert: true }
        );

        res.status(201).json({ message: 'Message added successfully', chat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





module.exports = { getChat, addMessageToChat };
