import React from 'react';
import Slider from 'react-slick';
import APSRTC from '../../assets/APSRTC.png';
import HRTC from '../../assets/HRTC.png';
import KeralaRtc from '../../assets/KERALA-RTC.png';
import KTCL from '../../assets/KTCL.png';
import PEPSU from '../../assets/PEPSU.png';
import RSRTC from '../../assets/RSRTC.png';
import SBSTC from '../../assets/SBSTC.png';
import TSRTC from '../../assets/TSRTC.png';
import UPSRTC from '../../assets/UPSRTC.png';
import WBTC from '../../assets/WBTC.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';





function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray" }}
        onClick={onClick}
      />
    );
  }
  

//  bus logos array
const busLogos = [
  { id: 1, name: 'APSRTC', src: APSRTC },
  { id: 2, name: 'HRTC', src: HRTC },
  { id: 3, name: 'KeralaRTC', src: KeralaRtc },
  { id: 4, name: 'KTCL', src: KTCL },
  { id: 5, name: 'PEPSU', src: PEPSU },
  { id: 6, name: 'RSRTC', src: RSRTC },
  { id: 7, name: 'SBSTC', src: SBSTC },
  { id: 8, name: 'TSRTC', src: TSRTC },
  { id: 9, name: 'UPSRTC', src: UPSRTC },
  { id: 10, name: 'WBTC', src: WBTC },
];

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Statebuses = () => {




  return (
    <div className='mt-[100px] h-[500px] w-full bg-white'>
      <div className='flex flex-row justify-between items-start pt-8'>
        <h1 className=' text-[40px] pl-8'>GOVERNMENT BUSES</h1>
        <Link
        to={"/viewallbuses"}
        state={{ offers: busLogos}} 
          className='text-xl text-blue-600 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded-l-2xl rounded-r-2xl h-12 w-32 flex items-center justify-center mr-4'
       >
        View All
        </Link>
      </div>
      <div className='h-[330px] w-[1200px] m-auto bg-white mt-6 pl-10'>
      <Slider {...settings}>
          {busLogos.map((bus) => (
            <div key={bus.id} className='px-4 mt-8'>
              <div className='h-full w-full flex flex-col p-6 bg-gray-100 rounded-2xl shadow-lg'>
                <div className='flex flex-row items-center mb-4'>
                  <img src={bus.src} alt={bus.name} className='h-12 w-12 object-contain' />
                  <h1 className='font-bold pl-4 text-2xl'>{bus.name}</h1>
                 
                </div>
                <div className='h-auto w-full flex flex-col space-y-2'>
                  <p className='text-sm text-gray-700'>
                    1450 services including Garuda Plus, Rajdhani and more
                  </p>
                  <p className='text-sm text-gray-600 bg-gray-200 p-2 rounded'>
                    Official booking partner of {bus.name}
                  </p>
                  <h4 className='text-sm text-red-600 font-semibold'>
                    Use code <span className='font-bold'>FIRST</span> to save up to ₹250 (only for first-time users)
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Statebuses;
