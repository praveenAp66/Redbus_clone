const express = require ('express');
const bcrypt = require('bcryptjs');
const connection = require("../mysql/mysql.js"); 

const app = express();
app.use(express.json());

const checkroute =(req, res) => {
    const { from, to } = req.body;
    
    const query = 'SELECT * FROM Routes WHERE origin = ? AND destination = ?';
    connection.query(query, [from, to], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        
        if (results.length > 0) {
            res.json({ routeExists: true, details: results[0] });
        } else {
            res.json({ routeExists: false });
        }
    });
};

module.exports=checkroute;