import React, { useState } from "react";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';


import Divider from '@mui/material/Divider';
import DoughnutChart from "../charts/DoughnutChart";
import LineChart from "../charts/LineChart";



const slides = [
  {
    src: "chromeExtension/src/assets/photes/3d2.png",
    alt: "Slide 1",
    caption: "Today",
  },
  {
    src: "chromeExtension/src/assets/photes/3d2.png",
    alt: "Slide 2",
    caption: "Weekly",
  },
  {
    src: "chromeExtension/src/assets/photes/3d2.png",
    alt: "Slide 3",
    caption: "Monthly",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className=" h-[400px] mx-auto ">
      <div id="default-carousel" className="relative" data-carousel="static">
        <div className="overflow-hidden relative h-[500px] rounded-lg sm:h-64 xl:h-80 2xl:h-96">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
                index === current
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-50 transform translate-x-full"
              }`}
              style={{
                transform: `translateX(${(index - current) * 100}%)`,
              }}
              data-carousel-item={index === current ? "active" : ""}
            >
             

              {/* <img
                src={slide.src}
                alt={slide.alt}
                className="block w-full h-full object-cover"
              /> */}
               
               
               
               
             
             
             <DoughnutChart/>
              {/* <Divider  sx={{
                backgroundColor:'white'
               }}/> */}

              <LineChart/>
               <span className="absolute top-6 left-1/2 text-sm  text-white/80 hover:text-white/80 transform -translate-x-1/2 -translate-y-1/2 ">
                {slide.caption}
              </span>
            </div>
          ))}
        </div>

        <div className="flex absolute  top-10 left-1/2 z-30 space-x-3 -translate-x-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-[5px] h-[5px] rounded-full ${
                index === current ? "bg-white" : "bg-gray-500"
              }`}
              aria-current={index === current}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrent(index)}
              data-carousel-slide-to={index}
            ></button>
          ))}
        </div>

        {/* <button
          type="button"
          className="flex  absolute top-0 left-0 z-30 justify-center w-8 h-8 rounded-full items-center px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
          data-carousel-prev
        >
          <span className=" justify-center  w-8 h-8 rounded-full sm:w-10 sm:h-10   ">
            
          </span>
        </button> */}

        <button
          type="button"
          className="flex  absolute top-2 left-2 z-30 items-center  justify-center w-8 h-8 rounded-full  p-2 cursor-pointer text-white/50 hover:text-white hover:bg-white/10  "
          onClick={prevSlide}
          data-carousel-prev
        >
        
       < ArrowBackIosRoundedIcon  sx={{
          height:'15px',
          width:'15px'
        }}/>
        </button>

        <button
          type="button"
          className="flex  absolute top-2  right-2 z-30 items-center  justify-center w-8 h-8 rounded-full text-white/50 hover:text-white p-2 cursor-pointer hover:bg-white/10 "
          onClick={nextSlide}
          data-carousel-prev
        >
        
        <ArrowForwardIosRoundedIcon sx={{
          height:'15px',
          width:'15px'
        }}/>
        </button>
      </div>
      
    </div>
     
  );
};

export default Carousel;
