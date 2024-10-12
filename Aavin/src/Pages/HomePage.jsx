import React, { useState, useEffect, useRef } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import slide1 from '../assets/Home Page slider/slider1.jpg';
import slide2 from '../assets/Home Page slider/tnpcb_banner_slider6.jpg';
import slide3 from '../assets/Home Page slider/tnpcb_banner_slider7.jpg';
import product1 from '../assets/HomeOurProduct/Milk .jpg';
import product2 from '../assets/HomeOurProduct/Milk Shake.jpg';
import product3 from '../assets/HomeOurProduct/milkpeda.jpg';
import product4 from '../assets/HomeOurProduct/curd 1 copy.jpg';
import product5 from '../assets/HomeOurProduct/Ghee.... (1).jpg';
import product6 from '../assets/HomeOurProduct/ice cream...jpg';
import './home.css';

const HomePage = () => {
  const images = [slide1, slide2, slide3];
  const products = [product1, product2, product3, product4, product5, product6];
  const [startIndex, setStartIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const productRef = useRef(null);
  const notificationRefs = useRef([]); // Create refs for each notification box

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const visibleProducts = products.slice(startIndex, startIndex + 4).concat(products.slice(0, Math.max(0, startIndex + 4 - products.length)));

  const handleScroll = () => {
    if (productRef.current) {
      const rect = productRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    // Check visibility of each notification box
    notificationRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          ref.classList.add('visible'); // Add class to make it visible
        } else {
          ref.classList.remove('visible'); // Remove class to hide it
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div >
      <Slide
        easing="ease"
        duration={3000}
        transitionDuration={500}
        prevArrow={<button className="custom-button left-5">Prev</button>}
        nextArrow={<button className="custom-button right-5">Next</button>}
      >
        {images.map((each, index) => (
          <div key={index} className="each-slide">
            <img
              src={each}
              alt={`slide-${index}`}
              className="w-full h-auto object-cover rounded-md zoom-in-effect"
            />
          </div>
        ))}
      </Slide>

      <div ref={productRef} className={`product-container ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Our Products</h2>
          <span className="block h-1 bg-blue-400 mt-1 mx-auto w-1/2"></span>
        </div>
        <div className="relative bg-light-gray p-4 rounded-md">
          <div className="flex justify-between items-center">
            <button className="arrow-button left-0" onClick={handlePrev}>❮</button>
            <div className="flex flex-grow justify-center">
              {visibleProducts.map((product, index) => (
                <div key={index} className="flex items-center mx-4">
                  <img
                    src={product}
                    alt={`product-${index}`}
                    className="w-full h-auto object-cover rounded-md max-w-[150px] product-image"
                  />
                  <div className="ml-2">
                    <h3 className="text-lg font-semibold">Product Name {startIndex + index + 1}</h3>
                    <p className="text-sm text-gray-600">Product details go here.</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="arrow-button right-0" onClick={handleNext}>❯</button>
          </div>
        </div>
      </div>

      {/* Notification Boxes */}
      <div className="notification-container mt-6 flex justify-between">
        <div ref={el => (notificationRefs.current[0] = el)} className="notification-box whats-new">
          <h3 className='text-white'>What's New</h3>
          <div className="scrolling-text">
            <p >Your new updates and notifications go here.</p>
          </div>
        </div>
        <div ref={el => (notificationRefs.current[1] = el)} className="notification-box tender-notification">
          <h3 className='text-white'>Tender Notification</h3>
          <div className="scrolling-text">
            <p >Latest tenders and related information here.</p>
          </div>
        </div>
        <div ref={el => (notificationRefs.current[2] = el)} className="notification-box employment-notification">
          <h3 className='text-white'>Employment Notification</h3>
          <div className="scrolling-text">
            <p >Current job openings and announcements here.</p>
          </div>
        </div>
      </div>

      {/* Latest Events */}
      <div>
        <h3>Latest Events</h3>
      </div>
    </div>
  );
};

export default HomePage;
