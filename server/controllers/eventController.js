const events = require("../models/events")
const { sendNotificationEmail } = require('../utils/email');
const Profile = require("../models/profile");

const addEvent = async (req, res) => {
    const event = req.body;
    const newEvent = new events(event);
    try {
        await newEvent.save();
        const allProfiles = await Profile.find();
        for (const userProfile of allProfiles) {
            const userId = userProfile.user;
            if (userProfile.profileEmail) {
                await sendNotificationEmail(userProfile.profileEmail, userId, newEvent);
            }
        }
        res.status(201).json(newEvent);
    }
    catch (error) {
        res.status(409).json({ message: error });
    }
}


const getEvents = async (req, res) => {
    try {
        const allEvents = await events.find();
        res.status(200).json(allEvents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    addEvent,
    getEvents
}

