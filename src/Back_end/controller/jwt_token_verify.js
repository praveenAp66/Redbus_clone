const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
   
    // Get the Authorization header
    const authHeader = req.header('Authorization');

     // Check if the Authorization header is missing
     if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

     // Extract the token part from the Bearer scheme
     const token = authHeader.split(' ')[1]; // 'Bearer token'


    // Check if not token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
      console.log("sucessfully  verified")
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
