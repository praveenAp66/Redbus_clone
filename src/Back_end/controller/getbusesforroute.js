const express = require('express');
const connection = require('../mysql/mysql.js'); 

const app = express();
app.use(express.json());

const queryAsync = (query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const getbusesforroute = async (req, res) => {
    const { origin, destination ,date} = req.query;

    const query = `
        SELECT DISTINCT
            B.bus_number,
            B.bus_id,
            B.bus_type,
            B.total_seats,
            B.rating,
            O.name AS Travels_name,
            R.origin,
            R.destination,
            R.distance,
            R.travel_time,
            R.step_from,
            T.departure_time,
            T.arrival_time,
            T.fare,
            T.trip_id
        FROM 
            Buses B
        JOIN 
            Bus_Operators O ON B.operator_id = O.operator_id
        JOIN 
            Trips T ON B.bus_id = T.bus_id
        JOIN 
            Routes R ON T.route_id = R.route_id
        WHERE 
            R.origin = ? AND R.destination = ?
            AND DATE(T.departure_time) = ?;
    `;

    try {
        const rows = await queryAsync(query, [origin, destination,date]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching buses:', error);
        res.status(500).send('Server error');
    }
};

module.exports = getbusesforroute;
