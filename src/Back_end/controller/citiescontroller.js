const express = require('express');
const connection = require('../mysql/mysql.js'); // Ensure this file contains the correct MySQL connection setup

const cities = async (req, res) => {
    try {
       const query=` SELECT city_name FROM Cities `

        const [rows] = await new Promise((resolve,reject)=>{
            connection.query(query, (error, results) => {
                if (error) return reject(error);
                resolve([results]);
            });
        })
        const cities = rows.map(row => row.city_name);

        res.json( {cities} );
        // console.log('Cities fetched:', cities); // Log the result to verify data
        
       
    } catch (error) {
        console.error('Error fetching cities:', error.message);
        res.status(500).send('Error fetching cities');
    }
};

module.exports = cities;
