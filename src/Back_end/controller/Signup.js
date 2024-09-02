const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require("../mysql/mysql.js");
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const signup = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const sql = 'INSERT INTO Users (name, email, password, phone_number) VALUES (?, ?, ?, ?)';
        connection.query(sql, [name, email, hashedPassword, phoneNumber], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email or Phone number already exists' });
                }
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // Generate JWT token after successful signup
            const payload = {
                user: {
                    name,
                    email    
                },
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            // Send token and user details to the client
            res.status(201).json({
                message: 'Signup successful',
                userId: result.insertId ,
                token,
                user: {
                    name,
                    email,
                },
            
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = signup;
