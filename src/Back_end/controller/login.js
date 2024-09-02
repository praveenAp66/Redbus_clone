const bcrypt = require('bcryptjs');
require('dotenv').config();
const connection = require("../mysql/mysql.js"); 
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const sql = 'SELECT * FROM Users WHERE email = ?';
        connection.query(sql, [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const user = results[0];

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            // Generate JWT
            const accessToken = jwt.sign(
                { user: { id: user.user_id } },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }  // Access token expires in 1 hour
            );

           // Send both tokens to the client
            res.json({
                accessToken,
                userId: user.user_id
            });

        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

module.exports = login;
