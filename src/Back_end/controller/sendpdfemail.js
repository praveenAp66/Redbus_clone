const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const nodemailer = require('nodemailer');
const multer = require('multer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const connection = require("../mysql/mysql.js"); 


// Set up multer for handling file uploads
const upload = multer();

// Function to send the PDF email
const sendpdfmail = async (req, res) => {
  
  const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header

  let userId;
  try {
    // Decode the token to extract the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key here
    userId = decodedToken.user.id; // Extract userId from decoded token

    if (!userId) {
      return res.status(400).json({ message: 'No user ID found in token.' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

   // Fetch email from the database using userId
  let email;
  const query = `SELECT email FROM users WHERE user_id = ?`;

  try {
    const [rows] = await new Promise((resolve, reject) => {
      connection.query(query, [userId], (error, results) => {
        if (error) return reject(error);
        resolve([results]);
      });
    });

    // Check if the rows are returned correctly
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    email = rows[0].email; // Safely access email assuming one result
  } catch (err) {
    console.error('Database query error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }


  const pdfBuffer = req.file.buffer;

  // Create a transporter for sending emails  
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Example: using Gmail service
    auth: {
      user: 's.pravee63@gmail.com', // Replace with your email
      pass: 'qesm litr glid cyxm'  // Replace with your email password
    }
  });

  // Set up email options
  const mailOptions = {
    from: 's.pravee63@gmail.com',
    to: email,
    subject: 'Your Booking Details',
    text: 'Please find attached your booking details.',
    attachments: [
      {
        filename: 'booking-details.pdf',
        content: pdfBuffer
      }
    ]
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};

// Export the function for use in other modules
module.exports = sendpdfmail;
