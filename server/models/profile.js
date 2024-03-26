// profile.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    imageUrl: String,
    profileName: String,
    profileEmail: String,
    gradYear: Date,
    userBio: String,
    userBirthday: Date,
    userCountry: String,
    userContact: String,
    userWebsiteUrl: String,
    userCurrentPassword: String,
    userNewPassword: String,
    userNewPasswordRepeat: String,
    userTwitterUrl: String,
    userFacebookUrl: String,
    userGithubUrl: String,
    userLinkedinUrl: String,
    userInstagramUrl: String,
    userNewsNotify: String,
    userWeeklyNotify: String,
    userPltUpdatesNotify: String,
    accountDelete: Boolean
});

const ProfileModel = mongoose.model("Profile", profileSchema);

module.exports = ProfileModel;
