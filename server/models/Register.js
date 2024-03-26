const mongoose = require("mongoose")
const { Schema } = mongoose

const registerSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
})
const RegisterModel = mongoose.model("Register", registerSchema);

module.exports = RegisterModel;

