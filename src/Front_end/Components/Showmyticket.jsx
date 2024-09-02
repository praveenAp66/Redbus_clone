import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import api from '../../api'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const Showmyticket = () => {
  const [bookingId, setBookingId] = useState('');
  // const [email, setEmail] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('Please log in to continue.');
      navigate("/signup")
      
    }

    try {
        // Decode token to get user ID
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.user.id;
     
      const response = await api.post('/showticket', { bookingId, userId },
        { // Configurations for headers
          headers: {
              'Authorization': `Bearer ${accessToken}` // Include the token in the request header
          }
      }    
      );
      setBookingDetails(response.data);
    } catch (err) {
      if (error.response && error.response.status === 401) {
        alert('Session expired, please log in again.');
        localStorage.removeItem('accessToken');
         // Redirect to the login page
         navigate("/signup")
}else {
      setError('Error fetching booking details. Please check your booking ID and .');
    }
  }
  };
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Booking Confirmed!', 20, 20);

    doc.setFontSize(12);
    doc.text(`Booking ID: ${bookingDetails.booking_id}`, 20, 40);
    doc.text(`Bus Number: ${bookingDetails.bus_id} (${bookingDetails.bus_number})`, 20, 50);
    doc.text(`Date: ${bookingDetails.departure_date}`, 20, 60);
    doc.text(`Departure Time: ${bookingDetails.departure_time}`, 20, 70);
    doc.text(`Arrival Time: ${bookingDetails.arrival_time}`, 20, 80);
    doc.text(`Seat Number: ${bookingDetails.seat_number}`, 20, 90);
    doc.text(`Total Fare: ₹${bookingDetails.total_amount}`, 20, 100);
    doc.text(`From: ${bookingDetails.from}`, 20, 110);
    doc.text(`To: ${bookingDetails.to}`, 20, 120);

    doc.save('booking-details.pdf');
  };

  return (
    <div className='mt-28 p-6 w-full mx-auto bg-gradient-to-b from-gray-200 to-gray-50   space-y-4'>
      <h2 className='text-4xl font-normal mb-4 text-center'>PRINT TICKET</h2>
      <h2 className='text-xl font-semibold mt-8 text-center'>Verify your details, and <span className='text-red-500'>Print</span> your tickets</h2>

      <form onSubmit={handleSubmit} className='space-x-10 flex justify-center items-center pt-8 pb-10'>
        <div className=''>
          <label className=' text-md font-semibold mb-1'>Booking ID:</label>
          <input
            type='text'
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            required
          />
        </div>

        {/* <div className=''>
          <label className=' text-md font-semibold mb-1 '>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            required
          />
        </div> */}

        <button
          type='submit'
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5 ml-5"
        >
          Submit
        </button>
      </form>

      {error && <p className='text-red-500'>{error}</p>}

      {bookingDetails && (
        <div className='flex flex-col'>
          <div className=' flex justify-center items-center'>
            <h2 className="text-xl font-medium mb-2  text-red-600">Ticket Details</h2>
          </div>
          <div className="bg-gray-100 p-4  mb-6 flex justify-center items-center">


            <div className="space-x-4 pl-10 flex" >
              <div className=' flex flex-col space-y-2'>
                <span className="font-bold">Booking ID:</span>
                <span className="font-bold">Bus Number:</span>
                <span className="font-bold">Date:</span>
                <span className="font-bold">Departure Time:</span>
                <span className="font-bold">Arrival Time:</span>
                <span className="font-bold">Seat Number:</span>
                <span className="font-bold">Total Fare:</span>
                <span className="font-bold">From:</span>
                <span className="font-bold">To:</span>
              </div>


              <div className='flex flex-col space-y-2'>
                <span>{bookingDetails.booking_id}</span>
                <span>{bookingDetails.bus_id} ({bookingDetails.bus_number})</span>
                <span>{bookingDetails.departure_date}</span>
                <span>{bookingDetails.departure_time}</span>
                <span>{bookingDetails.arrival_time}</span>
                <span>{bookingDetails.seat_number}</span>
                <span>₹{bookingDetails.total_amount}</span>
                <span>{bookingDetails.from}</span>
                <div className='flex '>
                  <span>{bookingDetails.to}</span>

                  {/* Download PDF Button */}
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-64"
                    onClick={downloadPDF}
                  >
                    Download Ticket
                  </button>

                </div>



              </div>
            </div>
          </div>
        </div>








      )}
    </div>
  );
};

export default Showmyticket;
