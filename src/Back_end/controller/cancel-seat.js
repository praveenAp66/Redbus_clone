const express = require('express');
const connection = require('../mysql/mysql.js'); // Ensure this is the path to your MySQL connection
const moment = require('moment'); // For handling date and time
const router = express.Router();

// Endpoint to handle cancel seat request
const cancelticket = async (req, res) => {
    const { bookingId, seatNumber } = req.body;

    // Basic input validation
    if (!bookingId || !seatNumber) {
        return res.status(400).json({ message: 'Booking ID and seat number are required.' });
    }

    try {
        // Convert seatNumber array to a format suitable for SQL IN clause
        const formattedSeats = seatNumber.map(seat => `'${seat}'`).join(',');

        // Step 1: Retrieve the trip's departure time and check if the booking exists and the seat is part of the booking
        const checkBookingAndTripQuery = `
            SELECT BS.seat_number, T.departure_time
            FROM BookedSeats BS
            JOIN Bookings B ON BS.booking_id = B.booking_id
            JOIN Trips T ON B.trip_id = T.trip_id
            WHERE BS.booking_id = ? AND BS.seat_number IN (${formattedSeats})
        `;

        const seat = await new Promise((resolve, reject) => {
            connection.query(checkBookingAndTripQuery, [bookingId], (error, results) => {
                if (error) return reject(error);
                // console.log('Check Booking and Trip Query Results:', results); // Log query results
                resolve(results);
            });
        });

        // Check if seat array is not empty
        if (!seat || seat.length === 0) {
            return res.status(404).json({ message: 'Seat not found for the given booking.' });
        }

    
        const departureTime = moment(seat[0].departure_time);
        // console.log("Departure Time:", departureTime);

        // Check if current time is before departure time
        if (moment().isSameOrAfter(departureTime)) {
            return res.status(400).json({ message: 'You can only cancel the ticket before the departure date.' });
        }

        // Step 2: Retrieve fare per seat using the bus_id from the Trips table
        const getFareQuery = `
            SELECT T.fare
            FROM bookings B
            JOIN Trips T ON B.trip_id = T.trip_id
            WHERE B.booking_id = ?`;

        const fareDetails = await new Promise((resolve, reject) => {
            connection.query(getFareQuery, [bookingId], (error, results) => {
                if (error) return reject(error);
                // console.log('Fare Details Query Results:', results);
                resolve(results);
            });
        });

        if (!fareDetails || fareDetails.length === 0) {
            return res.status(404).json({ message: 'Fare details not found.' });
        }

        // Extract the fare from the results
        const fare = fareDetails[0].fare;

        if (typeof fare === 'undefined') {
            return res.status(500).json({ message: 'Fare information is missing.' });
        }

        const refund_amount = fare * seatNumber.length; // Assuming each cancellation is for one seat

        // Step 3: Remove the seat from the BookedSeats table (or update the status if soft delete)
        const deleteSeatQuery = `
            DELETE FROM BookedSeats 
            WHERE booking_id = ? AND seat_number IN (${formattedSeats})`;

        await new Promise((resolve, reject) => {
            connection.query(deleteSeatQuery, [bookingId], (error, results) => {
                if (error) return reject(error);
                // console.log('Delete Seat Query Results:', results); // Log query results
                resolve(results);
            });
        });

        // Optionally, update the Booking status if all seats are canceled
        const updateBookingStatusQuery = `
            UPDATE bookings 
            SET status = 'Cancelled'
            WHERE booking_id = ? 
            AND NOT EXISTS (SELECT 1 FROM BookedSeats WHERE booking_id = ?)`;

        await new Promise((resolve, reject) => {
            connection.query(updateBookingStatusQuery, [bookingId, bookingId], (error, results) => {
                if (error) return reject(error);
                // console.log('Update Booking Status Query Results:', results); // Log query results
                resolve(results);
            });
        });

        // Step 4: Insert a record into the Cancellations table
        const cancellation_date = moment().format('YYYY-MM-DD HH:mm:ss'); // Current date and time
        const insertCancellationQuery = `
            INSERT INTO Cancellations (booking_id, cancellation_date, refund_amount)
            VALUES (?, ?, ?)`;

        await new Promise((resolve, reject) => {
            connection.query(insertCancellationQuery, [bookingId, cancellation_date, refund_amount], (error, results) => {
                if (error) return reject(error);
                // console.log('Insert Cancellation Query Results:', results); // Log query results
                resolve(results);
            });
        });

        res.status(200).json({ message: 'Seat canceled successfully.' });

    } catch (error) {
        console.error('Error canceling seat:', error);
        res.status(500).json({ message: 'Server error while canceling the seat.' });
    }
};

module.exports = cancelticket;
