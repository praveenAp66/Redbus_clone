import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdTimer } from "react-icons/io";
import api from '../../api'



const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes


  // Extracting the state passed from the previous page
  const { selectedSeats, userId, busid, date, fare, from, to, departuretime, arrivaltime, BusNo, tripid, passengers } = location.state || {};


  useEffect(() => {
    if (timeLeft === 0) {
      // Timeout reached: Show a toast and redirect to the seat selection page
      alert('Payment timed out. Redirecting to seat selection...');
      setTimeout(() => {
        navigate('/Busdetails', { state: { from: from, to: to, date: date } }, { replace: true });
      }, 3000);
      return;
    }

    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      // 10 minutes passed: Show a toast notification and redirect to seat selection
      toast.error('Payment session timed out, please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/Busdetails', { replace: true });
    }, 600000);

    // Cleanup timers on component unmount
    return () => {
      clearInterval(countdownTimer);
      clearTimeout(timeout);
    };
  }, [timeLeft, navigate]);



  // Helper function to format timeLeft into minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  const handlePayment = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      // Create an order on the server
      const orderResponse = await api.post('/create-order',
        {
          amount: fare * selectedSeats.length, // total amount to be paid
          currency: 'INR',
          receipt: `receipt_${Date.now()}`, // unique receipt ID
        },
        { // Configurations for headers
          headers: {
            'Authorization': `Bearer ${accessToken}` // Include the token in the request header
          }
        }
      );

      const order = orderResponse.data;

      // Razorpay payment options
      const options = {
        key: 'rzp_test_wEaWsPiNpnPdEX',  //secrete key =snsHwu9JTXXDZXDZ7RUOdg84
        amount: order.amount,
        currency: order.currency,
        name: 'Red Bus',
        description: 'Seat Booking',
        order_id: order.id, // This is the order ID returned by Razorpay
        handler: async (response) => {
          // Handle payment success

          const verifyResponse = await api.post('/verify-payment', {
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            payment_method: "Debit Card",
            selectedSeats,
            userId,
            busid,
            date: date,
            fare,
            tripid, departuretime, arrivaltime
          },
            { // Configurations for headers
              headers: {
                'Authorization': `Bearer ${accessToken}` // Include the token in the request header
              }
            }
          );

          if (verifyResponse.data.success) {
            // Redirect to confirmation page on success


            console.log("verified data", verifyResponse.data)

            await api.post('/passengerdetails', {
              passengers: passengers.map(passenger => ({
                name: passenger.name,
                age: passenger.age,
                gender: passenger.gender,
                seatNumber: passenger.seatNumber,
                state: passenger.state
              })),
              booking_id: verifyResponse.data.bookingDetails.bookingId
            },
              { // Configurations for headers
                headers: {
                  'Authorization': `Bearer ${accessToken}` // Include the token in the request header
                }
              }
            );


            navigate('/confirmation', {
              state: {
                bookingDetails: verifyResponse.data.bookingDetails,
                departuretime: departuretime,
                arrivaltime: arrivaltime,
                from: from,
                to: to,
                BusNo: BusNo,
                date: date
              }
            });

          } else {
            console.error('Payment verification failed');
            alert('Payment verification failed. Redirecting to seat selection...');
            navigate('/Busdetails', { state: { from: from, to: to, date: date } }, { replace: true });
          }
        },
        prefill: {
          name: 'praveen', // Replace with the user's name
          email: 'praveenkumar63sp@gmail.com', // Replace with the user's email
          contact: '7259817932', // Replace with the user's contact number
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Session expired, please log in again.');
        localStorage.removeItem('accessToken');
         // Redirect to the login page
         navigate("/signup")
}else {
      console.error('Payment initiation error:', error);
    }
  }
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;






  return (
    <div className="p-4 border border-gray-200 w-[900px] mx-auto mt-28 bg-gray-100 flex flex-col justify-center items-center  shadow-lg rounded-lg ">

      <div className="text-lg font-bold mb-4 h-[50px] w-full bg-red-500 text-yellow-300 justify-center items-center pt-2 flex">
        <p>Payment Details</p>
        <p className='pl-16 flex'> Time left to complete payment:<IoMdTimer className='pl-2' size={30} /> {formatTime(timeLeft)}</p>
      </div>

      <div className="mb-4 space-y-4  font-semibold">
        <div className='flex space-x-4 '>
          <p>From:<strong className='font-semibold'> {from} </strong></p>
          <p className="mt-1 pl-4"><FaLongArrowAltRight /> </p>
          <p className=' pl-6'>To: <strong className='font-semibold '> {to}</strong></p>
          <p className=' pl-12'>Bus No: <strong className='font-semibold '>{busid}({BusNo})</strong></p>

        </div>

        <div className='flex '>
          <p>Date:<strong className='font-semibold'> {date}</strong></p>
          <p className=' pl-16'>Total Seats:<strong className='font-semibold'> {selectedSeats.length}</strong></p>
          <p className=' pl-8'>Seats No:<strong className='font-semibold'>{Array.from(selectedSeats).join(",")}</strong></p>
        </div>

        <p>Total Amount:<strong className='font-semibold'> ₹{fare * selectedSeats.length}</strong></p>
      </div>
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex justify-center items-center mt-4"
      >
        Pay Now
      </button>
      <ToastContainer />
    </div>
  );
};

export default PaymentForm;
