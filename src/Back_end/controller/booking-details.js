const express = require('express');
const connection = require("../mysql/mysql.js");

const bookingdetails = async (req, res) => {
    const { bookingId, userId } = req.query;  // Retrieve bookingId and email from query parameters
    // console.log(bookingId, userId);

    try {
        // Verify booking ID and email by joining Users and Bookings tables
        const bookingQuery = ` 
            SELECT b.*, u.email 
            FROM bookings b 
            JOIN users u ON b.user_id = u.user_id
            WHERE b.booking_id = ? AND u.user_id = ?`;
        
        // Execute the booking query with parameters and wrap it in a promise
        const booking = await new Promise((resolve, reject) => {
            connection.query(bookingQuery, [bookingId, userId], (error, results) => {
                if (error) return reject(error);
                // console.log('Booking Query Results:', results); // Log query results
                resolve(results);
            });
        });

        // Check if the booking was found
        if (!booking.length) {
            // console.log('No booking found or email does not match.');
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Fetch seat and passenger details
        const seatsAndPassengersQuery = `
            SELECT 
                p.name AS passenger_name,
                p.seat_number,
                b.seat_number AS booked_seat_number
            FROM 
                Passengers p
            JOIN 
                BookedSeats b ON p.booking_id = b.booking_id AND p.seat_number = b.seat_number
            WHERE 
                p.booking_id = ?`;

        // Execute the seats and passengers query and wrap it in a promise
        const seatsAndPassengers = await new Promise((resolve, reject) => {
            connection.query(seatsAndPassengersQuery, [bookingId], (error, results) => {
                if (error) return reject(error);
                // console.log('Seats and Passengers Query Results:', results);
                resolve(results);
            });
        });

        // Return booking details along with seat and passenger details\
        // console.log('Final response data:', { booking: booking[0], seatsAndPassengers });  // Log the final response data
        res.json({ booking: booking[0], seatsAndPassengers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = bookingdetails;
