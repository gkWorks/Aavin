require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const router = express.Router();

// Configure multer for file handling
const upload = multer({ dest: 'uploads/' });

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Endpoint to handle email sending
router.post('/send-email', upload.single('file'), (req, res) => {
    const { name, email, phone, location, enquiry, message } = req.body;
    const file = req.file; // The uploaded file

    // Check if file exists and set the attachment options
    let attachments = [];
    if (file) {
        attachments.push({
            filename: file.originalname,
            path: file.path,
        });
    }

    const mailOptions = {
        from: email,
        to: 'mk708133@gmail.com', // Your recipient email
        subject: 'New Enquiry',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nEnquiry: ${enquiry}\nMessage: ${message}`,
        attachments: attachments,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

module.exports = router;
