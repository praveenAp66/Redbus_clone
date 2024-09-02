import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Can I track the location of my booked bus online?",
      answer: "Yes, you can track your bus online by using our bus tracking app feature called “Track My Bus”. This feature allows passengers and their families to track the live bus location. You may follow your bus on a map and use the information to plan your trip to the boarding point and to get off at the correct stop. Family and friends may also check the bus position to schedule pick-ups and ensure safety.."
    },
    {
      id: 2,
      question: "What are the advantages of purchasing a bus ticket with redBus?",
      answer: "There are many advantages to purchasing online bus tickets with redBus. redBus is India’s most trusted bus ticket company, where you can book any type of private or government-owned bus. redBus allows you to find the different types of buses, choose the preferred bus seats, and find your nearest boarding and dropping points. You can also filter the buses based on timings, like morning, evening, etc. ."
    },
    {
      id: 3,
      question: "Why book bus tickets online on redBus?",
      answer: "Booking bus tickets online on redBus is increasingly becoming the preferred choice for travellers due to its numerous advantages over traditional methods. With redBus, customers can book their bus tickets effortlessly from the comfort of their homes, avoiding the inconvenience of standing in long lines at bus stations or travel agencies. Online bus booking offers the luxury of comparing different bus schedules and operators and presents various discount offers and exclusive deals, resulting in significant savings. Payment security is another notable feature of online booking, which ensures that your financial information is well-protected against fraud. Additionally, customers can pick their seats, providing a customized travel experience. Online bus booking platforms give real-time updates about any changes in the bus timetable, including delays or cancellations, enabling better planning. The convenience doesn't stop here; travellers can even compare onboard amenities like charging points or snacks, further enhancing the travel experience.."
    },
    {
      id: 4,
      question: "Does bus booking online cost me more?",
      answer: "Not at all! The bus ticket price is the same as you would get from the bus operator/ counter of any bus ticket agency. redbus reduces the travel budget by comparing the bus ticket prices among various operators, making it a more cost-effective choice. Therefore, online bus booking is increasingly recognized as a more convenient, efficient, and economical mode of securing travel arrangements."
    },
    {
      id: 5,
      question: "How can I get the discounts on the bus booking?",
      answer: "To get a discount on bus booking, please visit https://www.redbus.in/info/OfferTerms and check the available offers. Copy the coupon code and paste it during checkout to avail of the discount."
    },
    {
        id:6,
        question:"What's New in Bus Booking on redBus?",
        answer:"Primo Bus Ticket: redBus has launched Primo bus services, where passengers can enjoy travelling in high-rated buses with best-in-class services. While looking for bus tickets on the desired route, customers can check the Primo tag to choose this excellent service. From hygiene standards to on-time service and comfort, passengers can benefit from the online bus booking experience from Primo buses."

    }
  ];

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className='width-full h-auto mt-12'>
      <div className='w-[1200px] h-auto m-auto'>
        <div className='leading-32 font-montserrat '>
          <h1 className='text-4xl ml-4'>FAQs related to Bus Tickets Booking</h1>
          <div className='mt-4 '>
            {questions.map((q) => (
              <div key={q.id} className='mb-4 last:mb-0'>
                <button
                  className='w-full text-left font-bold focus:outline-none p-4 bg-white rounded-lg shadow-md flex justify-between items-center'
                  onClick={() => toggleQuestion(q.id)}
                >
                  {q.question}
                  {activeQuestion === q.id ? <FaMinusCircle /> : <FaPlusCircle />}
                </button>
                <AnimatePresence>
                  {activeQuestion === q.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.0 }} // Adjust the duration here
                      className='p-4 bg-gray-200 rounded-lg mt-2'
                    >
                      {q.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
