const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();
const connection = require("../mysql/mysql.js");

const razorpay = new Razorpay({
  key_id: 'rzp_test_wEaWsPiNpnPdEX', // Replace with your Razorpay key_id
  key_secret: 'snsHwu9JTXXDZXDZ7RUOdg84' // Replace with your Razorpay key_secret
});

const verifypayment = async (req, res) => {
  const { order_id, payment_id, signature, selectedSeats, userId, busid, date, fare, departuretime, arrivaltime, payment_method, tripid } = req.body;

  const currentDate = new Date().toISOString().split('T')[0]; 

  const body = order_id + '|' + payment_id;
  const expectedSignature = crypto.createHmac('sha256', razorpay.key_secret)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === signature) {
    // Insert Payment Record
    connection.query(
      'INSERT INTO Payments (booking_id, payment_method, payment_status, payment_date, amount) VALUES (?, ?, ?, ?, ?)',
      [null, payment_method, 'Completed', currentDate, fare * selectedSeats.length],
      (err, paymentResult) => {
        if (err) {
          console.error('Error inserting payment details:', err);
          return res.json({ success: false, message: 'Error saving payment details' });
        }

        const paymentId = paymentResult.insertId; // Get the generated payment_id

        // Insert Booking Record
        connection.query(
          'INSERT INTO Bookings (user_id, trip_id, booking_date, status, total_amount, payment_id) VALUES (?, ?, ?, ?, ?, ?)',
          [userId, tripid, currentDate, 'Completed', fare * selectedSeats.length, paymentId],
          (err, bookingResult) => {
            if (err) {
              console.error('Error inserting booking details:', err);
              return res.json({ success: false, message: 'Error saving booking details' });
            }

            const bookingId = bookingResult.insertId; // Get the generated booking_id

            // Insert Booked Seats
            const seatInsertions = selectedSeats.map(seat => {
              return new Promise((resolve, reject) => {
                connection.query(
                  'INSERT INTO BookedSeats (booking_id, seat_number, bus_id, trip_id, trip_date) VALUES (?, ?, ?, ?,?)',
                  [bookingId, seat, busid, tripid,date],
                  (err) => {
                    if (err) {
                      console.error('Error inserting booked seat:', err);
                      reject(err);
                    } else {
                      resolve();
                    }
                  }
                );
              });
            });

            Promise.all(seatInsertions)
              .then(() => {
                // Update Payment Record with booking_id
                connection.query(
                  'UPDATE Payments SET booking_id = ? WHERE payment_id = ?',
                  [bookingId, paymentId],
                  (err) => {
                    if (err) {
                      console.error('Error updating payment with booking_id:', err);
                      return res.json({ success: false, message: 'Error updating payment with booking_id' });
                    }

                    const bookingDetails = {
                      bookingId: bookingId,
                      busNumber: busid,
                      date,
                      payment_id,
                      departuretime,
                      arrivalTime: arrivaltime,
                      seatNumber: selectedSeats.join(', '),
                      totalFare: selectedSeats.length * fare
                    };

                    res.json({ success: true, bookingDetails: bookingDetails });
                  }
                );
              })
              .catch((error) => {
                res.json({ success: false, message: 'Error saving booked seats' });
              });
          }
        );
      }
    );
  } else {
    res.json({ success: false, message: 'Payment verification failed' });
  }
};

module.exports = verifypayment;
