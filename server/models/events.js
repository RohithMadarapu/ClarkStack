const mongoose = require("mongoose")
const { Schema } = mongoose

const eventsSchema = new Schema({
    title: String,
    description: String,
    date: String,
    time: String,
    duration: String,
    place: String,
    state: String,
    city: String,
    type: String,
    participants: String
})

const EventsModel = mongoose.model("events", eventsSchema);

module.exports = EventsModel;