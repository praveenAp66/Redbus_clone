
import React, { useState } from 'react';
import railpop from '../../assets/railPop.png'
import trainticketimg from '../../assets/train_ticket.svg';
import railhasselfree from '../../assets/railHasslefree.svg';
import railrefund from '../../assets/railrefunds.svg';
import railauthorized from '../../assets/railAuthorized.png';
import tick from '../../assets/tick.svg'
import { FaStar } from "react-icons/fa6";
import qrcode from '../../assets/qrCode.svg'
import playstore from '../../assets/playStoregoogle.svg'
import appstore from '../../assets/appStore.svg'
import appinstallbng from '../../assets/appInstallbg.svg'
import primohomebannercompo from '../../assets/primoHomeBannerComp.webp'
import { FaRegStar } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { FaPrayingHands } from "react-icons/fa";
import india from '../../assets/India.svg'
import colombia from '../../assets/Colombia.svg'
import indonesia from '../../assets/Indonesia.svg'
import malaysia from '../../assets/Malaysia.svg'
import peru from '../../assets/Peru.svg'
import Singapore from '../../assets/Singapore.svg'
import vietnam from '../../assets/Vietnam.svg'
import cambodia from '../../assets/Cambodia.svg'
import redbusimg from '../../assets/rdc-redbus-logo.webp';





const countryFlags = [
    { id: 1, name: 'India', src: india },
    { id: 2, name: 'Colombia', src: colombia },
    { id: 3, name: 'Indonesia', src: indonesia },
    { id: 4, name: 'Malaysia', src: malaysia },
    { id: 5, name: 'Peru', src: peru },
    { id: 6, name: 'Singapore', src: Singapore },
    { id: 7, name: 'Vietnam', src: vietnam },
    { id: 8, name: 'Cambodia', src: cambodia },
];



const Redbusadds = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='h-full w-full '>
            {/* for train section */}
            <div className='h-auto w-[1117px] m-auto bg-white flex flex-row justify-between items-center'>
                <div className='pl-2 w-1/2'>
                    <div className='text-black text-3xl font-bold mb-6 space-y-3'>
                        <h1> NOW, GET MORE THAN </h1>
                        <h1>JUST BUS TICKETS WITH </h1>
                        <h1>REDBUS!</h1>
                    </div>

                    <div className='text-black mb-6'>
                        <div className='inline-flex items-center border-b-2 border-red-500 pb-1'>
                            <img src={trainticketimg} alt="trainimg" className='mr-2' />
                            <span className='text-red-500 font-bold'>Train Ticket</span>
                        </div>
                    </div>

                    <div className='text-black mb-6 font-normal'>
                        Book IRCTC Train Tickets on redRail with a simple & superfast booking process, no service fee + no payment gateway charge.
                    </div>

                    <div className='text-black mb-6 font-bold space-y-4'>
                        <div className='flex items-center '>
                            <img src={railauthorized} alt="railauthorized" className='h-10 w-10 ' />
                            <h3 className='ml-4'>Authorized IRCTC Partner</h3>
                        </div>
                        <div className='flex items-center mb-2'>
                            <img src={railhasselfree} alt="railhasselfree" className='h-10 w-10 mr-4' />
                            <h3>Instant refunds on UPI payments</h3>
                        </div>
                        <div className='flex items-center mb-2'>
                            <img src={railrefund} alt="railrefund" className='h-10 w-10 mr-4' />
                            <h3>Hassle-free customer support</h3>
                        </div>
                    </div>

                    <button className='bg-red-700 text-white py-2 px-4 rounded-lg'>
                        Book Train Ticket
                    </button>
                </div>

                <div className='h-[612px] w-[634px] bg-white py-10 '>
                    <img src={railpop} alt="railpop" className='w-full h-full object-cover' />
                </div>
            </div>
            {/* for apps section */}
            <div className='h-[500px] w-full'>
                <div className='h-full w-[1117px] m-auto flex items-center'>
                    <div
                        className='w-[1200px] h-[425px] mt-14 p-8 m-auto rounded-xl shadow-lg bg-no-repeat bg-cover bg-center'
                        style={{ backgroundImage: `url(${appinstallbng})` }}
                    >
                        <div className='text-white text-4xl font-bold mb-1'>ENJOY THE APP!</div>
                        <div className='flex mt-1'>
                            <div className='text-black mt-16 ml-8 bg-white w-1/3 h-2/4 p-6 rounded-lg shadow-md'>
                                <div>
                                    <div className='flex flex-col space-y-4 mb-8'>
                                        <div className='flex'>
                                            <img src={tick} alt="tick" />
                                            <div className='text-lg font-semibold ml-2'>Quick Access</div>
                                        </div>
                                        <div className='flex'>
                                            <img src={tick} alt="tick" />
                                            <div className='text-lg font-semibold ml-2'>Superior Live Tracking</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex space-x-8'>
                                    <div className='flex flex-col space-y-2'>
                                        <div className='flex items-center'>
                                            <div className='text-lg font-semibold'>4.5</div>
                                            <FaStar />
                                        </div>
                                        <div className='text-sm'>50M+ downloads</div>
                                        <div className='text-sm font-medium'>Play store</div>
                                    </div>
                                    <div className='flex flex-col space-y-2 pl-2'>
                                        <div className='flex items-center'>
                                            <div className='text-lg font-semibold'>4.5</div>
                                            <FaStar />
                                        </div>
                                        <div className='text-sm'>50M+ downloads</div>
                                        <div className='text-sm font-medium'>Play store</div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-24 ml-8 w-[150px] h-[235px] p-6 rounded-lg space-y-6'>
                                <div className='flex flex-col items-start justify-start text-white font-bold'>
                                    <div>Scan to</div>
                                    <div>download</div>
                                    <div className='mt-1'>
                                        <img src={qrcode} alt="qrcode" />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-24 ml-4 w-[200px] h-[235px] p-6 rounded-lg space-y-6'>
                                <div className='flex flex-col items-start justify-start text-white font-bold'>
                                    <div>Download the</div>
                                    <div>App on</div>
                                    <div className='mt-1'>
                                        <img src={playstore} alt="playstore" />
                                    </div>
                                    <div className='mt-1'>
                                        <img src={appstore} alt="appstore" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* for advertisemnt section */}
            <div className='h-[580px] w-[1170px] m-auto mt-12  p-4'>
                <div className='flex'>
                    <div className='h-[552px] w-[800px]'>
                        <img src={primohomebannercompo} alt=" primohomebannercompo" className='rounded-l-[28px]' />
                    </div>
                    <div className='h-[487px] w-[490px] flex flex-col items-center justify-center rounded-r-[28px]
                     text-white space-y-24'style={{ backgroundColor: 'rgb(35, 48, 88)' }}>
                        <div className='flex space-x-12'>
                            <div><IoTimerOutline size={45} className='mt-2' /></div>
                            <div className='flex flex-col font-bold'>
                                <div className='text-3xl'>On Time</div>
                                <div>Punctual arrivals on 95% Trips </div>
                            </div>
                        </div>
                        <div className='flex space-x-12 mr-7'>
                            <div><FaPrayingHands size={45} className='mt-2' /></div>
                            <div className='flex flex-col font-bold'>
                                <div className='text-3xl'>Friendly Staff</div>
                                <div>Always Ready to Help</div>
                            </div>
                        </div>
                        <div className='flex space-x-12 mr-7'>
                            <div><FaRegStar size={45} className='mt-2' /></div>
                            <div className='flex flex-col font-bold'>
                                <div className='text-3xl'>Top Rated</div>
                                <div>Buses with 4+ star ratings </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>


            {/* map section of countries */}
            <div className='h-[280px] w-full relative mt-12'>
                <div className='absolute flex flex-col h-[240px] w-[1250px] ml-6 mt-4 space-y-8'>
                    <div className='text-3xl font-medium pl-16'>
                        <h1>Global Presence</h1>
                    </div>
                    <div className='flex flex-wrap space-x-12 justify-center items-center'>
                        {countryFlags.map((country) => (
                            <div className='flex flex-col items-center' key={country.id}>
                                <div className='h-[106px] w-[100px]'>
                                    <img src={country.src} alt={country.name} className='object-contain h-full w-full' />
                                </div>
                                <div className='h-[23px] w-[78px] text-center font-semibold'>
                                    <h3>{country.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Book bus ticket online online */}


            <div className='w-full h-auto relative'>
                <div className='w-[1200px] h-auto mt-8 ml-12 p-6 rounded-lg'>
                    <section>
                        <h2 className='text-4xl font-normal mb-4'>BOOK BUS TICKETS ONLINE</h2>
                    </section>
                    <div className='leading-32 font-montserrat text-lg'>
                        <p>
                            redBus is India's largest brand for online bus ticket booking and offers an easy-to-use online bus and train ticket booking...
                            {isExpanded ? (
                                <span>
                                    {/* Expanded text */}
                                    Booking a bus ticket online on the redBus app or website is very simple. You can download the redBus app or visit redbus.in...
                                    redBus also offers other exclusive benefits on online bus tickets like flexible ticket rescheduling options, easy & friendly...
                                </span>
                            ) : (
                                <button  onClick={handleToggle} className='text-blue-500 underline mt-4'>Read more</button>
                            )}
                        </p>
                        {isExpanded && (
                            <p>
                                {/* Conditionally rendered text when expanded */}
                                <button onClick={handleToggle} className='text-blue-500 underline mt-4'>Read less</button>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className='w-[1200px] h-auto m-auto mt-8'>
                <div className='ml-4'>
                    <div className='text-4xl font-normal'>Bus Booking redDeals on redBus</div>
                    <div className='leading-32 text-lg mt-2'>
                        <p>Don't miss out on these incredible offers, book your bus tickets now and travel with convenience and affordability...</p>
                    </div>
                </div>

                <div className='border border-gray-400 rounded-lg h-[187px] w-[1250px] flex items-center justify-center mt-4'>
                    <div className='mt-6 h-[107px] w-[1177px]'>
                        <div className='flex'>
                            <div className='flex justify-start'>
                                <div className='pt-4'>
                                    <img src={redbusimg} alt="redbusimg" className='h-[56px]' />
                                </div>
                                <div className='pl-8 space-y-3'>
                                    <p className='font-semibold text-4xl'>Unlock Unbeatable Exclusive redDeals! 20% OFF</p>
                                    <p className='font-semibold space-x-2'>
                                        <span><span style={{ color: 'red' }}>3891</span> Deals</span> <span className="border-l border-gray-400 h-4"></span>
                                        <span><span style={{ color: 'red' }}>1612</span> Bus Operators </span> <span className="border-l border-gray-400 h-4"></span>
                                        <span><span style={{ color: 'red' }}>265521 </span> Routes</span>
                                    </p>
                                </div>
                            </div>

                            <div className='pl-36'>
                                <button className='w-[133px] h-[48px] bg-red-500 text-white rounded-lg'>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
           
            

        </div>

    )
}

export default Redbusadds;
