import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';


const Confirmationpage = () => {
  const { state } = useLocation(); // Get state from navigation
  const { bookingDetails, departuretime, arrivaltime, from, to, BusNo ,date } = state || {};
  const navigate = useNavigate();

  if (!bookingDetails) {
    return <div>No booking details available</div>; // Handle the case where no details are available
  }

  const gotomainpage = () => {
    navigate('/');
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Booking Confirmed!', 20, 20);

    doc.setFontSize(12);
    doc.text(`Booking ID: ${bookingDetails.bookingId}`, 20, 40);
    doc.text(`Bus Number: ${bookingDetails.busNumber} (${BusNo})`, 20, 50);
    doc.text(`Date: ${date}`, 20, 60);
    doc.text(`Departure Time: ${departuretime}`, 20, 70);
    doc.text(`Arrival Time: ${arrivaltime}`, 20, 80);
    doc.text(`Seat Number: ${bookingDetails.seatNumber}`, 20, 90);
    doc.text(`Total Fare: ₹${bookingDetails.totalFare}`, 20, 100);
    doc.text(`From: ${from}`, 20, 110);
    doc.text(`To: ${to}`, 20, 120);

    doc.save('booking-details.pdf');
  };



  return (
    <div className="mt-24 px-4 py-6 max-w-3xl mx-auto bg-white shadow-xl rounded-lg ">
      <h1 className="text-2xl font-semibold text-green-600 mb-4">Booking Confirmed!</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-medium mb-2 pl-10">Booking Details</h2>

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
            <span>{bookingDetails.bookingId}</span>
            <span>{bookingDetails.busNumber} ({BusNo})</span>
            <span>{date}</span>
            <span>{departuretime}</span>
            <span>{arrivaltime}</span>
            <span>{bookingDetails.seatNumber}</span>
            <span>₹{bookingDetails.totalFare}</span>
            <span>{from}</span>
            <div className='flex '>
              <span>{to}</span>

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

      <div className="text-center">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={gotomainpage}
        >
          Go to Home
        </button>

    

      </div>
    </div>
  );
};

export default Confirmationpage;
