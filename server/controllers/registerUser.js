const register = require("../models/Register");
const Event = require("../models/events");
const User = require("../models/user");


const registerEvent = async (req, res) => {
    try {
        const { eventId, userId } = req.body;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        const existingRegistration = await register.findOne({ eventId, userId });
        if (existingRegistration) {
            return res.status(400).json({ error: 'User is already registered for this event' });
        }
        const newRegistration = new register({ eventId, userId });
        await newRegistration.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error registering for the event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const checkRegistration = async (req, res) => {
    try {
        const { eventId, userId } = req.body;

        const existingRegistration = await register.findOne({ eventId, userId });

        res.json({ isRegistered: !!existingRegistration });
    } catch (error) {
        console.error('Error checking user registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const registrations = async (req, res) => {
    try {
        const response = await register.find();
        res.json(response);
    } catch (error) {
        console.error('Error fetching Registrations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const participants = async (req, res) => {
    try {
        const { eventId } = req.params;
        const registrations = await register.find({ eventId }).populate('userId');

        const participants = registrations.map(({ userId }) => {
            if (userId && userId._id && userId.name) {
                return {
                    userId: userId._id,
                    name: userId.name,
                    email: userId.email
                };
            } else {
                return null;
            }
        }).filter(participant => participant !== null);
        res.json(participants);
    } catch (error) {
        console.error('Error fetching participants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    registerEvent, checkRegistration, registrations, participants
}

