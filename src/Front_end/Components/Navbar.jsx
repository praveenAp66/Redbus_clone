import React,{useState,useRef,useEffect} from 'react';
import redbusimg from '../../assets/rdc-redbus-logo.webp';
import trainticketimg from '../../assets/train_ticket.svg';
import busing from '../../assets/busticket.svg';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useUser } from "../Components/Usercontext"; 
import { useNavigate } from 'react-router-dom';




const myaccount = [
    { id: 1, name: 'Cancel Ticket',link:'/cancelticket' },
    // { id: 2, name: 'Change Travel Date' },
    { id: 2, name: 'Show my Ticket',link:'/showmyticket' },
    { id: 3, name: 'Email/SMS', link:'/email'},
    { id: 4, name: 'Login/SignUp' ,link: '/signup',action:'login' },
    { id: 5, name: 'Logout', action: 'logout' }
];



const Navbar = () => {
    const dropdownref=useRef(null)
    const accountli=useRef(null)
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const { userId, logout } = useUser();
    const navigate = useNavigate(); 
    


    const toggleAccountSection = () => {
        setIsAccountOpen(prev => !prev);
    };

let hadnleoutside=(event)=>{
  if(
    (dropdownref.current && !dropdownref.current.contains(event.target) )&&
    (accountli.current && !accountli.current.contains(event.target))
  )
    {
        
        
        setIsAccountOpen(false)
    }
}

    useEffect(()=>{
     
            document.addEventListener('mousedown',hadnleoutside )
            return()=>{
                document.removeEventListener('mousedown',hadnleoutside)
            }
    },[])


    const handleLogout = () => {
        logout();
        localStorage.removeItem('accessToken')
        navigate('/');
     
      
    };
    const gotohome=()=>{
        navigate("/")

    }

    const filteredAccountItems = userId 
    ? myaccount.filter(item => item.action !== 'login') // Exclude login item if logged in
    : myaccount.filter(item => item.action !== 'logout') 
    return (
        <div className="h-28 w-full bg-white fixed top-0 z-50">
            <div className="h-full max-w-[1200px] m-auto bg-white flex justify-between items-center px-4 md:px-0">
                {/* Mobile section */}
                <div className="flex items-center w-full md:hidden">
                    <GiHamburgerMenu className="h-6 w-6 text-black cursor-pointer" />
                    <img src={redbusimg} alt="redbuslogo" className='h-10 mx-2 cursor-pointer' />
                    <RiAccountCircleLine className="h-6 w-6 text-black ml-auto cursor-pointer" />
                </div>

                {/* Desktop/browser view */}
                <div className="hidden md:flex items-center space-x-16">
                    <div className='pt-5'>
                        <img src={redbusimg} alt="redbuslogo" className='h-12 cursor-pointer'onClick={gotohome} />
                    </div>
                    <ul className='flex flex-row space-x-8'>
                        <li className='flex flex-col items-center bg-red-500 text-white p-2 rounded cursor-pointer'>
                            <img src={busing} alt="buslogo" className='h-5 mb-2 backdrop-brightness-[4] backdrop-opacity-90' />
                            <span>Bus Tickets</span>
                        </li>
                        <li className='flex flex-col items-center hover:bg-zinc-300 text-black p-2 rounded group cursor-pointer'>
                            <img src={trainticketimg}
                                alt="trainlogo"
                                className='h-5 mb-2 filter grayscale brightness-0 group-hover:filter-none group-hover:grayscale-0 group-hover:brightness-100' />
                            <span>Train Tickets</span>
                        </li>
                    </ul>
                </div>

                <div className="hidden md:flex items-center mr-5">
                    <ul className='flex flex-row space-x-8'>
                        <li className='flex items-center space-x-3 group p-2 rounded hover:bg-zinc-300 transition-all duration-300 cursor-pointer'>
                            <TfiHeadphoneAlt className='transition-transform duration-300' />
                            <span className='transition-transform duration-300'>Help</span>
                        </li>
                        <li className='flex items-center space-x-3 group p-2 rounded hover:bg-zinc-300 transition-all duration-300 cursor-pointer'onClick={toggleAccountSection} ref={accountli}>
                            <RiAccountCircleLine className='transition-transform duration-300' />
                            <span className='transition-transform duration-300'>{userId ? 'My Account' : 'Account'}</span>
                            <IoIosArrowDown className='transition-transform duration-300' />
                            {
                                isAccountOpen && (
                                    <div ref={dropdownref} className='absolute right-6 mt-64 w-48 bg-white border border-gray-300 rounded-md shadow-lg'>
                                        <ul className='py-2'>
                                            {
                                                filteredAccountItems.map((item) => (
                                                    item.action === 'logout' ? (
                                                        <li
                                                            key={item.id}
                                                            onClick={handleLogout}
                                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer block'
                                                        >
                                                            {item.name}
                                                        </li>
                                                    ) : (
                                                        <Link
                                                            to={item.link}
                                                            key={item.id}
                                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer block'
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )
                                                ))}
                                            
                                        </ul>
                                    </div>
                                )
                            }
                        </li>
                    </ul>
                </div>
            </div>
          
        </div>
    );
}

export default Navbar;

