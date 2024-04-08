const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getUserProfile, getUsername, userProfile, del, userNameById, allUsers } = require('../controllers/authController');
const { addEvent, getEvents } = require('../controllers/eventController');
const { getChat, addMessageToChat } = require('../controllers/eventChatController')
const jwt = require("jsonwebtoken");
const { registerEvent, checkRegistration, registrations, participants } = require('../controllers/registerUser');
const { getNotifications, addNotificationsToChat } = require('../controllers/notificationsController');

async function cookieJwtAuth(req, res, next) {
    const token = req.cookies.token;

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = user.user;
        next();
    } catch (err) {
        res.clearCookie("token");
        console.log(err);
    }
}

// middleware
const corsOptions = {
    origin: process.env.frontend_url, // frontend's URL methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies or authentication headers
    optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
};

router.use(cors(corsOptions));

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile", getUserProfile);
router.post("/events", addEvent);
router.get("/allEvents", getEvents);
router.get("/chats/:eventId", getChat);
router.post("/updateChats", addMessageToChat);
router.post("/userName", getUsername);
router.post("/registerUser", registerEvent);
router.post("/checkRegister", checkRegistration);
router.get("/getProfile/:userId", userProfile);
router.delete("/deleteAccount", del);
router.get("/getName", userNameById);
router.get("/allUsers", allUsers);
router.get("/allRegistrations", registrations);
router.get("/participants/:eventId", participants);
router.get("/notifications/:eventId", getNotifications);
router.post("/updateNotifications", addNotificationsToChat);

module.exports = router;
