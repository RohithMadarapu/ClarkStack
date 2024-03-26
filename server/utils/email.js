
const nodemailer = require('nodemailer');
const axios = require('axios');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karthik.edhala@gmail.com',
        pass: 'lxke zjcs lexd jpgp'
    }
});

const sendNotificationEmail = async (recipientEmail, user, newEvent) => {
    try {

        const response = await axios.get('http://localhost:8000/getName', {
            params: { Id: user }
        });

        const userName = response.data;
        const emailBody = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>University Event Notification</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }

                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    color: #333333;
                }

                h2 {
                    color: #0056b3;
                }

                p {
                    color: #555555;
                    line-height: 1.6;
                }

                strong {
                    color: #333333;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h1>University Event Notification</h1>
                <p>Hello ${userName},</p>
                <p>We are excited to inform you about a new event at Clark University!</p>
                <h2>${newEvent.title}</h2>
                <p><strong>Date:</strong>${newEvent.date}</p>
                <p><strong>Time:</strong>${newEvent.time}</p>
                <p><strong>Location:</strong>${newEvent.place}</p>
                <p><strong>Description:</strong>${newEvent.description}</p>
                <p>Make sure to mark your calendar and join us for this exciting event!</p>
                <p>Best regards,</p>
                <p>Clark University Clark Stack Team</p>
            </div>
        </body>
        </html>
    `;

        const mailOptions = {
            from: 'karthik.edhala@gmail.com',
            to: recipientEmail,
            subject: 'Event Created Notification',
            html: emailBody,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendNotificationEmail };