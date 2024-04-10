const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const http = require('http'); // Import the http module
const { Server } = require("socket.io");

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const server = http.createServer(app); // Create an http.Server instance

const io = new Server(server, { // Pass the http.Server instance to Socket.IO
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
});

// ... (existing code)clark

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data.eventId);
        console.log(`User with ID: ${socket.id} joined room: ${data.eventId}`);
    });

    socket.on("send_message", (data) => {
        console.log(`Received message from ${socket.id} in room ${data.eventId}: ${data.content}`);
        // Emit the message to the specific room (event ID)
        io.to(data.eventId).emit(`receive_message_${data.eventId}`, data);
    });
    socket.on("new_event", (newEvent) => {
        console.log(`New event created: ${newEvent.title}`);
        io.emit("new_event", newEvent);
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

// ... (existing code)


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DataBase connected successfully"))
    .catch((err) => console.log("DataBase not connected", err))

const port = 8000;
app.use("/", require('./routes/authRoutes'))

server.listen(port, () => console.log(`Server is running on port ${port}`));
