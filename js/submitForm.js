// submitForm.js

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { name, email, subject, message } = req.body;

            // Configure nodemailer transporter
            const transporter = nodemailer.createTransport({
                // Configure your email provider settings here
                // Example for Gmail:
                service: 'gmail',
                auth: {
                    user: 'shyamalm0912@egmail.com',
                    pass: 'bstisdcan1@S'
                }
            });

            // Email content
            const mailOptions = {
                from: email,
                to: 'shyamalm0912@egmail.com', // Replace with your recipient email address
                subject: subject,
                text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
            };

            // Send email
            await transporter.sendMail(mailOptions);
            res.status(200).send('Email sent successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        }
    } else {
        res.status(405).send({ error: 'Method not allowed' });
    }
};
