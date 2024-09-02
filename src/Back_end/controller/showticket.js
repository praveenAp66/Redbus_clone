const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const connection = require("../mysql/mysql.js"); 

const showticket= async (req, res) => {
  const { bookingId, userId } = req.body;
   
  if (!bookingId || !userId) {
    return res.status(400).send('Booking ID  required.');
  }

  const query = `
    SELECT 
      b.booking_id,
      bs.seat_number,
      t.departure_time,
      DATE(t.departure_time) AS departure_date, 
      t.arrival_time,
      b.total_amount,
      r.origin AS \`from\`,
      r.destination AS \`to\`,
      b.booking_date,
      bu.bus_id,
      bu.bus_number
    FROM 
      Bookings b
      JOIN Users u ON b.user_id = u.user_id
      JOIN Trips t ON b.trip_id = t.trip_id
      JOIN BookedSeats bs ON b.booking_id = bs.booking_id
      JOIN Routes r ON t.route_id = r.route_id
      JOIN Buses bu ON t.bus_id = bu.bus_id
    WHERE 
      b.booking_id = ? AND 
      u.user_id = ?;
  `;

  connection.query(query, [bookingId, userId], (error, results) => {
    if (error) {
      console.error('Error fetching booking details:', error);
      return res.status(500).json({ message: 'Error fetching booking details.' });
    }

    if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'No booking found for the provided details.' });
      }
  } )
};

module.exports=showticket;
