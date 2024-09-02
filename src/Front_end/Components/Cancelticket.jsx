import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CancelSeat = () => {
  const [bookingId, setBookingId] = useState('');
  // const [email, setEmail] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]); // Changed from selectedSeat to selectedSeats
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('Please log in to continue.');
      navigate("/signup")
      
    }
    
    try {

       // Decode token to get user ID
       const decodedToken = jwtDecode(accessToken);
       const userId = decodedToken.user.id;

      const response = await api.get('/booking-details', {
        params: { bookingId, userId },
        // Configurations for headers
          headers: {
              'Authorization': `Bearer ${accessToken}` // Include the token in the request header
          }
          
      });
     
      if (response.data.seatsAndPassengers.length === 0) {
        toast.info('No tickets available for the provided booking ID.');
      } else {
        setPassengers(response.data.seatsAndPassengers);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Session expired, please log in again.');
        localStorage.removeItem('accessToken');
         // Redirect to the login page
         navigate("/signup")
           }else {
      console.error('Error fetching booking details:', error);
      toast.error('Failed to retrieve booking details');
           }
    }
  };

  const handleCancelSeat = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (selectedSeats.length > 0) {
      try {
        await api.post('/cancel-seat', { bookingId, seatNumber: selectedSeats  },
          {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Include the token in the request header
        }
      }
        );
        toast.success('Selected Seat canceled successfully');
        setPassengers((prevPassengers) =>
          prevPassengers.filter((seat) => !selectedSeats.includes(seat.seat_number))
        );
        setSelectedSeats(null);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Session expired, please log in again.');
          localStorage.removeItem('accessToken');
           // Redirect to the login page
           navigate("/signup")
             }else {
        console.error('Error canceling seat:', error);
        toast.error( 'you can able to cancel the ticket before the departure date only!');
      }
    }
    }
    else {
      toast.warning('Please select a seat to cancel.');
    }
  };

  const toggleSelectSeat = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };


  return (
    <div className='mt-28 p-6 w-full mx-auto bg-gradient-to-b from-gray-200 to-gray-50 space-y-4'>
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className='text-4xl font-normal mb-4 text-center'>Cancel Ticket</h2>
      <h2 className='text-xl font-semibold mt-8 text-center'>Verify your details, and <span className='text-red-500'>Cancel</span> your tickets</h2>

      <form onSubmit={handleSubmit} className='space-x-10 flex justify-center items-center pt-8 pb-10'>
        <div>
          <label className='text-md font-semibold mb-1'>Booking ID:</label>
          <input
            type='text'
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            required
          />
        </div>

        {/* <div>
          <label className='text-md font-semibold mb-1'>Email:</label>
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

      {passengers.length > 0 && (
        <>
          <h2 className='text-xl font-semibold text-center'>Select Seat to Cancel</h2>
          <div className='overflow-x-auto flex justify-center'>
            <div className='w-full max-w-3xl'>
              <table className='w-full bg-white border border-gray-300 text-sm table-fixed'>
                <thead>
                  <tr className='w-full bg-gray-200 text-gray-600'>
                    <th className='py-2 px-4 border-b text-left'>Seat Number</th>
                    <th className='py-2 px-4 border-b text-left'>Passenger Name</th>
                    <th className='py-2 px-4 border-b text-left'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {passengers.map(passenger => (
                    <tr key={passenger.seat_number}>
                      <td className='py-2 px-4 border-b text-left'>{passenger.seat_number}</td>
                      <td className='py-2 px-4 border-b text-left'>{passenger.passenger_name}</td>
                      <td className='py-2 px-4 border-b text-left'>
                        <button
                          className={`py-1 px-4 rounded-md ${selectedSeats === passenger.seat_number ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                          onClick={() => toggleSelectSeat(passenger.seat_number)}
                        >
                         {selectedSeats.includes(passenger.seat_number) ? 'Selected' : 'Select for Cancellation'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {selectedSeats.length > 0 && (
            <div className='mt-4 text-center'>
              <button
                className='bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                onClick={handleCancelSeat}
              >
                Cancel the ticket for Selected Seat
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CancelSeat;
