// cronJob.js

const cron = require('node-cron');
const axios = require('axios');

// Schedule a task to run every 10 minutes
cron.schedule('*/10 * * * *', async () => {
    try {
        await axios.post('http://localhost:5000/api/releaseExpiredReservations');
        console.log('Expired reservations released');
    } catch (error) {
        console.error('Failed to release expired reservations:', error);
    }
});
