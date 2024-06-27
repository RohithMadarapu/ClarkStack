const User = require("../models/user");
const Profile = require("../models/profile");
const ChatModel = require("../models/eventChat");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require('dotenv').config();

const test = (req, res) => {
    res.json('test is working');
}

//Register endpoint
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[clarku]+\.[edu]{2,4}$/;
    return emailRegex.test(email);
};
function isStrongPassword(password) {
    // Password length check
    if (password.length < 8) {
        return false;
    }

    // Complexity requirements
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/;
    return regex.test(password);
}
const isUsernameValid = async (username) => {
    // Check if the username format is valid (letters, numbers, underscores, hyphens)
    const usernameRegex = /^[a-zA-Z0-9_ -]{3,16}$/;
    if (!usernameRegex.test(username)) {
        return false;
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    return !existingUser; // Return true if the username is available
};


const registerUser = async (req, res) => {
    const adminMails = ["admin@clarku.edu"];
    try {
        const { name, email, password } = req.body;

        // Validate username
        if (!(await isUsernameValid(name))) {
            return res.json({ error: 'Username is invalid' });
        }


        // Check if password meets complexity requirements
        if (!isStrongPassword(password)) {
            return res.json({
                error: "Password should be at least 8 characters long and include lowercase, uppercase, numbers, and special characters."
            });
        }


        // Check if email is in a valid format
        if (!isValidEmail(email)) {
            return res.json({
                error: "Invalid email format"
            });
        }

        // Check if email is already taken
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email is already taken"
            });
        }

        const defaultRole = adminMails.includes(email) ? 'admin' : 'user';
        console.log("Working upto here");
        // Hash password for user security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            name, email, password: hashedPassword, role: defaultRole
        });

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};


const getUserProfile = async (req, res) => {
    try {
        const {
            userId,
            imageUrl,
            profileName,
            profileEmail,
            gradYear,
            userCurrentPassword,
            userNewPassword,
            userNewPasswordRepeat,
            userBio,
            userBirthday,
            userCountry,
            userContact,
            userWebsiteUrl,
            userTwitterUrl,
            userFacebookUrl,
            userGithubUrl,
            userLinkedinUrl,
            userInstagramUrl,
            userNewsNotify,
            userWeeklyNotify,
            userPltUpdatesNotify,
            accountDelete
        } = req.body;

        if (!userId) {
            return res.status(400).json({
                error: "User ID is required to update/create a profile."
            });
        }
        if (userCurrentPassword && userNewPassword && userNewPasswordRepeat) {
            const user = await User.findById(userId);
            const isValid = await bcrypt.compare(userCurrentPassword, user.password);
            if (isValid) {
                if (userNewPassword != userNewPasswordRepeat) {
                    return res.status(400).json({
                        error: 'The New password fields are not matching'
                    })
                }
                if (isStrongPassword(userNewPassword)) {
                    const hashedPassword = await bcrypt.hash(userNewPassword, 10);
                    user.password = hashedPassword;
                    await user.save();
                } else {
                    return res.status(400).json({
                        error: 'The Password should be strong.'
                    })
                }
            } else {
                return res.status(400).json({
                    error: "The current password is Wrong."
                });
            }
        }
        let profile = await Profile.findOne({ user: userId });
        if (!profile) {
            profile = new Profile({
                user: userId,
                imageUrl,
                profileName,
                profileEmail,
                gradYear,
                userCurrentPassword,
                userNewPassword,
                userNewPasswordRepeat,
                userBio,
                userBirthday,
                userCountry,
                userContact,
                userWebsiteUrl,
                userTwitterUrl,
                userFacebookUrl,
                userGithubUrl,
                userLinkedinUrl,
                userInstagramUrl,
                userNewsNotify,
                userWeeklyNotify,
                userPltUpdatesNotify,
                accountDelete

            });
        } else {
            profile.imageUrl = imageUrl;
            profile.profileName = profileName;
            profile.profileEmail = profileEmail;
            profile.gradYear = gradYear;
            profile.userCurrentPassword = userCurrentPassword;
            profile.userNewPassword = userNewPassword;
            profile.userNewPasswordRepeat = userNewPasswordRepeat;
            profile.userBio = userBio;
            profile.userBirthday = userBirthday;
            profile.userCountry = userCountry;
            profile.userContact = userContact;
            profile.userWebsiteUrl = userWebsiteUrl;
            profile.userTwitterUrl = userTwitterUrl;
            profile.userFacebookUrl = userFacebookUrl;
            profile.userGithubUrl = userGithubUrl;
            profile.userLinkedinUrl = userLinkedinUrl;
            profile.userInstagramUrl = userInstagramUrl;
            profile.userNewsNotify = userNewsNotify;
            profile.userWeeklyNotify = userWeeklyNotify;
            profile.userPltUpdatesNotify = userPltUpdatesNotify;
            profile.accountDelete = accountDelete;
        }
        await profile.save();

        return res.json(profile);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

const del = async (req, res) => {
    try {
        const { userId } = req.body;
        await User.findByIdAndDelete(userId);
        await Profile.findOneAndDelete({ user: userId });
        await ChatModel.deleteMany({ 'messages.senderId': userId });
        res.json({ message: 'User and associated records deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const userProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        let response = await Profile.findOne({ user: userId });
        if (response) {
            return res.status(200).json(response);
        } else {
            return res.status(500).json({ message: 'No profile found with the provided userId' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


//Login End point
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        // Check if email is in a valid format
        if (!isValidEmail(email)) {
            return res.json({
                error: "Please enter the valid Credentials"
            });
        }

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "No User Found"
            })
        }

        //Check if password matches
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ error: "password not matching" });
        } else {
            jwt.sign({ user: { email: user.email, id: user._id, name: user.name } }, process.env.ACCESS_TOKEN, { expiresIn: "1h" }, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { sameSite: 'None', secure: true }).json(user);
            });
        }

    } catch (error) {
        console.log(error);
    }
}

const getUsername = async (req, res) => {
    try {
        const senderIds = req.body.senderIds;
        const users = await User.find({ _id: { $in: senderIds } });

        const usernameMap = users.reduce((acc, user) => {
            acc[user._id] = user.name; // Replace 'name' with the actual field in your User model
            return acc;
        }, {});

        res.status(200).json(usernameMap);
    } catch (error) {
        console.error('Error fetching usernames:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const userNameById = async (req, res) => {
    try {
        const { Id } = req.query;  // Access 'Id' from query parameters
        const user = await User.findById(Id);
        res.status(200).json(user.name);
    } catch (error) {
        console.error('Error in userNameById:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    test, registerUser, loginUser, getUserProfile, getUsername, userProfile, del, userNameById, allUsers
}