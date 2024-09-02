const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify the access token
const verifyAccessToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.header('Authorization');

    // Check if the Authorization header is present
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extract the token from the Bearer scheme
    const token = authHeader.split(' ')[1]; // 'Bearer token'

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the access token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log("Successfully verified access token66");
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = verifyAccessToken;
