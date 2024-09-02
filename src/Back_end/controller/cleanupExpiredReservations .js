const connection = require("../mysql/mysql.js"); 

const cleanupExpiredReservations = async () => {
    try {
        // Update seats where the reservation has expired
        await connection.query(
            `UPDATE Seats 
             SET is_reserved = FALSE, 
                 reservation_timestamp = NULL, 
                 reservation_expiry = NULL 
             WHERE is_reserved = TRUE 
             AND reservation_expiry IS NOT NULL 
             AND reservation_expiry < NOW()`
        );
        // console.log('Expired reservations cleaned up.');
    } catch (error) {
        console.error('Error cleaning up expired reservations:', error.message);
    }
};

// Schedule this function to run periodically, e.g., every 10 minutes
setInterval(cleanupExpiredReservations, 10 * 60 * 1000);

module.exports = cleanupExpiredReservations;
