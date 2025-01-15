const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();


const myGmail = process.env.MY_GMAIL;
const myPassword = process.env.MY_PASSWORD;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure your Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myGmail,
        pass: myPassword,
    },
});

app.post('/send-email', async (req, res) => {
    const { subject, message, userMail } = req.body;

    const mailOptions = {
        from: userMail,
        to: 'subhadiphazra722@gmail.com', // Replace with your email
        subject: subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        res.status(500).send('Error sending email: ' + error.message);
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
