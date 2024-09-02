
const express = require('express');
const router = express.Router();
const connection = require('../mysql/mysql.js'); // Adjust the path if needed

const getreservedseats= async (req, res) => {
    const { bus_id ,date,tripid } = req.query;

    if (!bus_id || !date) {
        return res.status(400).json({ message: 'Bus ID is required' });
    }

    try {
        // Query to get reserved seats
        // const query = `
        //      SELECT seat_number 
        //     FROM Seats 
        //     WHERE bus_id = ? 
        //       AND is_reserved = 1 
        //       AND reservation_expiry > NOW()

        // `;

        const query = `
        SELECT s.seat_number 
        FROM Seats s
        JOIN Trips t ON s.bus_id = t.bus_id
        WHERE s.bus_id = ? 
          AND t.trip_id = ?
          AND DATE(t.departure_time) = ?
          AND s.is_reserved = 1 
          AND s.reservation_expiry > NOW();
    `;
       
        const [rows] = await new Promise((resolve, reject) => {
            connection.query(query, [bus_id ,tripid ,date ], (error, results) => {
                if (error) return reject(error);
                resolve([results]);
            });
        });

        const reservedSeats = rows.map(row => row.seat_number);

        res.json({ reservedSeats });
    } catch (error) {
        console.error('Error fetching reserved seats:', error);
        res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
};

module.exports = getreservedseats;
