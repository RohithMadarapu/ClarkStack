
const NotificationsModel = require("../models/notifications");

const getNotifications = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const chat = await NotificationsModel.findOne({ eventId });

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


const addNotificationsToChat = async (req, res) => {
    try {
        const { eventId, userId, content } = req.body;

        const chat = await NotificationsModel.findOneAndUpdate(
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





module.exports = { getNotifications, addNotificationsToChat };   
