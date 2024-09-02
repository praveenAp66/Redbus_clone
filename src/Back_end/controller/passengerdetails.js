const connection = require("../mysql/mysql.js");

const passengerdetails= async (req, res) => {
    const { passengers, booking_id } = req.body;

    try {
        // Insert each passenger into the Passengers table
        for (let passenger of passengers) {
            const { name, age, gender, seatNumber, state } = passenger;

            await connection.query(
                'INSERT INTO Passengers (booking_id, name, age, gender, seat_number, state) VALUES (?, ?, ?, ?, ?, ?)',
                [booking_id, name, age, gender, seatNumber, state]
            );
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error storing passenger details:', error);
        res.status(500).json({ success: false, message: 'Failed to store passenger details' });
    }
};

module.exports = passengerdetails;