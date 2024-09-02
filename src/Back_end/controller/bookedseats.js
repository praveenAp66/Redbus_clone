const connection = require("../mysql/mysql.js");
const bookedseats = (req, res) => {
    const { bus_id, tripId ,date} = req.query;

    connection.query(
      // 'SELECT seat_number FROM BookedSeats WHERE bus_id = ? AND trip_id = ?',
      `SELECT seat_number
      FROM BookedSeats
      WHERE BookedSeats.bus_id = ?
	   AND BookedSeats.trip_id = ? 
	   AND BookedSeats.trip_date = ?;
         `, 
      [bus_id, tripId,date],
      (err, results) => {
        if (err) {
          console.error('Error fetching booked seats:', err);
          return res.status(500).json({ success: false, message: 'Error fetching booked seats' });
        }
        res.json({ success: true, bookedSeats: results.map(row => row.seat_number) });
      }
    );
};

module.exports = bookedseats;
