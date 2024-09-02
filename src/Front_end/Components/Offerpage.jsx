import React from 'react';
import Slider from 'react-slick';
import firstimg from '../../assets/first.png';
import secondimg from '../../assets/second.png';
import thirdimg from '../../assets/third.png';
import fourthimg from '../../assets/fourth.png';
import fifthimg from '../../assets/fifth.png';
import sixthimg from '../../assets/sixth.png';
import seventhimg from '../../assets/seventh.png';
import { IoCopyOutline } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';  // Import Link from react-router-dom



// Sample images array
const images = [
  { id: 1, name: 'first', src: firstimg },
  { id: 2, name: 'second', src: secondimg },
  { id: 3, name: 'third', src: thirdimg },
  { id: 4, name: 'fourth', src: fourthimg },
  { id: 5, name: 'fifth', src: fifthimg },
  { id: 6, name: 'sixth', src: sixthimg },
  { id: 7, name: 'seventh', src: seventhimg },
];

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

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



const Offerpage = () => {



  return (
    <div className='relative bottom-0 left-0 right-0 mt-8'>
      <div className='h-auto w-[1200px] m-auto bg-white rounded-2xl'>
        <div className='h-auto w-[1136px] m-auto'>
          <div className='flex flex-row justify-between items-start pt-8'>
            <h1 className='font-bold text-2xl'>TRENDING OFFERS</h1>
            <Link
             to="/viewalloffers" 
             state={{ offers: images }}  // Pass the offers array in state // Use Link component to navigate
            className='text-xl text-blue-600 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded-2xl h-12 w-32 flex items-center justify-center'
            >
              View All
            </Link>
          </div>
          <div className='mt-3'>
            <Slider {...settings}>
              {images.map((img) => (
                <div key={img.id} className='px-2'>
                  <div className='h-[145px] w-[268px] flex flex-row p-4 rounded-2xl text-white bg-gradient-to-r from-blue-500 to-sky-500'>
                    <div className='flex'>
                      <div className='flex items-center'>
                        <img src={img.src} alt={img.name} className='h-[64px] w-[64px] object-cover rounded-xl' />
                      </div>
                      <div className='pl-4 pb-1 h-[109px] w-[164px] flex flex-col justify-between'>
                        <div className='font-bold h-6 w-12 bg-gray-500 flex items-center justify-center rounded-lg'>Bus</div>
                        <div className='font-bold'>Save up to Rs 250 on Bus Ticket</div>
                        <div>Valid till 31st August</div>
                        <div className='flex items-center space-x-2'>
                          <div className='font-bold h-6 w-12 flex items-center justify-center border-dashed border-2 border-white'>First</div>
                          <span><IoCopyOutline /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offerpage;

//previous code this is 
// import React from 'react';
// import Slider from 'react-slick';
// import firstimg from '../../assets/first.png';
// import secondimg from '../../assets/second.png';
// import thirdimg from '../../assets/third.png';
// import fourthimg from '../../assets/fourth.png';
// import fifthimg from '../../assets/fifth.png'
// import sixthimg from '../../assets/sixth.png'
// import seventhimg from '../../assets/seventh.png'
// import { IoCopyOutline } from "react-icons/io5";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";



// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "gray" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "gray" }}
//       onClick={onClick}
//     />
//   );
// }

// // Sample images array
// const images = [
//   { id: 1, name: 'first', src: firstimg },
//   { id: 2, name: 'second', src: secondimg },
//   { id: 3, name: 'third', src: thirdimg },
//   { id: 4, name: 'fourth', src: fourthimg },
//   { id: 5, name: 'fifth', src: fifthimg },
//   { id: 6, name: 'sixth', src: sixthimg },
//   { id: 7, name: 'seventh', src: seventhimg },

// ];

// const settings = {
//   dots: true,
//   infinite: false,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   autoplay: false,
//   autoplaySpeed: 3000,
//   nextArrow: <SampleNextArrow />,
//   prevArrow: <SamplePrevArrow />,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

// const Offerpage = () => {
//   return (
//     <div className='absolute bottom-[-260px] left-0 right-0'>
//       <div className='h-[308px] w-[1200px] m-auto bg-white rounded-l-2xl rounded-r-2xl'>
//         <div className='h-[244px] w-[1136px] m-auto'>
//           <div className='flex flex-row justify-between items-start pt-8'>
//             <h1 className='font-bold text-2xl'>TRENDING OFFERS</h1>
//             <a
//               href="#"
//               className='text-xl text-blue-600 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded-l-2xl rounded-r-2xl h-12 w-32 flex items-center justify-center'
//             >
//               View All
//             </a>
//           </div>

//           <div className='mt-2'>
//             <Slider {...settings}>
//               {images.map((img) => (
//                 <div key={img.id} className='px-2'>
//                   <div className='h-[145px] w-[268px] flex flex-row p-4 rounded-l-2xl rounded-r-2xl text-white bg-gradient-to-r from-blue-500 to-sky-500  '>
//                     <div className='flex'>
//                       <div className='flex items-center'>
//                         <img src={img.src} alt={img.name} className='h-[22] w-[22] object-cover rounded-xl' />
//                       </div>
//                       <div className='pl-4 pb-1 h-[109px] w-[164px] flex flex-col justify-between'>
//                         <div className='font-bold h-6 w-12 bg-gray-500 flex items-center justify-center rounded-lg'>Bus</div>
//                         <div className='font-bold'>Save up to Rs 250 on Bus Ticket</div>
//                         <div>valid till 31st August</div>
//                         <div className='flex items-center space-x-8'>
//                           <div className='font-bold h-6 w-12 flex items-center justify-center border-dashed border-2 border-white'>First</div>
//                           <span><IoCopyOutline /></span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   </div>
//               ))}
//                 </Slider>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Offerpage;