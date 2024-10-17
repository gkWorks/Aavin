import React, { useRef } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; 
import './home.css';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 
import slide1 from '../assets/Home Page slider/article.jpg'; 
import slide2 from '../assets/Home Page slider/article (1).jpg';
import slide3 from '../assets/Home Page slider/56862323_365531840732609_633596186846035968_n.jpg';
import product1 from '../assets/HomeOurProduct/Milk .jpg'; 
import product2 from '../assets/HomeOurProduct/milkpeda.jpg';
import product3 from '../assets/HomeOurProduct/Milk Shake.jpg';
import product4 from '../assets/HomeOurProduct/curd 1 copy.jpg';
import product5 from '../assets/HomeOurProduct/ice cream...jpg';
import product6 from '../assets/HomeOurProduct/Ghee.... (1).jpg';
import product7 from '../assets/HomeOurProduct/Milk .jpg';
import product8 from '../assets/HomeOurProduct/ice cream...jpg';
import event1 from '../assets/Event/2.jpg';
import event2 from '../assets/Event/6-1.jpg';
import event3 from '../assets/Event/77307443_144001703671005_8132512259919314944_n.jpg';
import event4 from '../assets/Event/79903328_159636608774181_5959946041565380608_n.jpg';

const HomePage = () => {
  const slideRef = useRef();
  const productRef = useRef();

  const goNext = () => {
    slideRef.current.goNext();
  };

  const goBack = () => {
    slideRef.current.goBack();
  };

  const images = [slide1, slide2, slide3];
  const products = [
    { id: 1, name: "Product 1", details: "Details about Product 1", img: product1, bg: 'bg-blue-200' },
    { id: 2, name: "Product 2", details: "Details about Product 2", img: product2, bg: 'bg-green-200' },
    { id: 3, name: "Product 3", details: "Details about Product 3", img: product3, bg: 'bg-yellow-200' },
    { id: 4, name: "Product 4", details: "Details about Product 4", img: product4, bg: 'bg-red-200' },
    { id: 5, name: "Product 5", details: "Details about Product 5", img: product5, bg: 'bg-purple-200' },
    { id: 6, name: "Product 6", details: "Details about Product 6", img: product6, bg: 'bg-pink-200' },
    { id: 7, name: "Product 7", details: "Details about Product 7", img: product7, bg: 'bg-teal-200' },
    { id: 8, name: "Product 8", details: "Details about Product 8", img: product8, bg: 'bg-orange-200' },
  ];

  return (
    <div className="relative w-full bg-gray-100 overflow-hidden mt-52">
      {/* Slider Section */}
      <div >
        <Slide
          ref={slideRef}
          easing="ease"
          duration={3000}
          transitionDuration={500}
          arrows={false}
          autoplay={true}
          cssClass="animate__animated animate__fadeIn"
        >
          {images.map((each, index) => (
            <div key={index} className="flex justify-center items-center h-96 bg-cover bg-center">
              <img 
                src={each} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg shadow-md" 
              />
            </div>
          ))}
        </Slide>
        {/* Custom Previous Button */}
        <div className="absolute top-48 left-4 transform -translate-y-1/2">
          <button
            className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
            onClick={goBack}
          >
            <FaArrowLeft className="text-xl" />
          </button>
        </div>
        {/* Custom Next Button */}
        <div className="absolute top-48 right-4 transform -translate-y-1/2">
          <button
            className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
            onClick={goNext}
          >
            <FaArrowRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* Product Container */}
      <div className="relative w-full py-4 bg-gray-100 overflow-hidden"> {/* Reduced py-8 to py-4 */}
        <h2 className="text-2xl font-bold text-center mb-6 mt-8 text-blue-600">Our Products</h2>
        <Slide
          ref={productRef}
          slidesToShow={4}
          slidesToScroll={4}
          autoplay={false}
          duration={0}
          cssClass="animate__animated animate__fadeIn"
          easing="ease"
        >
          {products.map(({ id, name, details, img, bg }) => (
             <motion.div
             key={id}
             className={`p-4 mx-2 ${bg} rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 h-56`}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: id * 0.1 }}
           >
            <div 
              key={id} 
              className={`p-4 mx-2 ${bg} rounded-lg  hover:shadow-xl transition duration-300 transform hover:-translate-y-1 h-56`} // Increased height
            >
              
              <div className="flex">
                <img 
                  src={img} 
                  alt={name} 
                  className="w-40 h-48 object-cover rounded-lg mr-4 hover:scale-105 transition duration-300" // Increased image size
                />
                <div>
                  <h3 className="text-lg font-bold">{name}</h3>
                  <p className="text-sm text-gray-700">{details}</p>
                </div>
              </div>
             
            </div>
            </motion.div>
          ))}
        </Slide>
      </div>
{/* Notification Container */}

<div className="relative w-full bg-gray-100 overflow-hidden">
  <h2 className="text-2xl font-bold text-center mt-8 text-blue-600">Notifications</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
    {/* What's New Box */}
    <motion.div
            className="bg-gradient-to-t from-blue-200 to-blue-400 p-4 rounded-lg shadow-md h-72 flex flex-col"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
    <div className="bg-gradient-to-t from-blue-200 to-blue-400 p-4 rounded-lg  h-72 flex flex-col">
      <h3 className="text-white text-lg font-bold mb-2 hover:scale-105 transition duration-300">What's New</h3>
      <div className="overflow-hidden flex-grow">
        <div className="animate-text whitespace-nowrap text-white text-md font-medium">
          <p>New product launches every week!</p>
          <p>Exciting offers on your favorite items!</p>
          <p>Check out our latest recipes!</p>
        </div>
      </div>
    </div>
    </motion.div>
    
    {/* Employment Notification Box */}
    <motion.div
            className="bg-gradient-to-t from-green-200 to-green-400 p-4 rounded-lg shadow-md h-72 flex flex-col"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
    <div className="bg-gradient-to-t from-green-200 to-green-400 p-4 rounded-lg  h-72 flex flex-col">
      <h3 className="text-white text-lg font-bold mb-2 hover:scale-105 transition duration-300">Employment Notification</h3>
      <div className="overflow-hidden flex-grow">
        <div className="animate-text whitespace-nowrap text-white text-md font-medium">
          <p>We are hiring! Apply now.</p>
          <p>Looking for passionate individuals to join our team!</p>
          <p>Visit our careers page for more details.</p>
        </div>
      </div>
      
    </div>
    </motion.div>
  </div>
</div>

 {/* Our Events Container */}
 <div className="relative w-full bg-gray-100 overflow-hidden mt-10 mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Our Events</h2>
        <Slide
          slidesToShow={3}
          slidesToScroll={1}
          autoplay={false}
          ref={productRef} 
          easing="ease"
        >
          {[
            { id: 1, img: event1, description: "Parlour Opening on Jan 06, 2024" },
            { id: 2, img: event2, description: "Parlour with Amusement Park for Kids" },
            { id: 3, img: event3, description: "Childrens Day" },
            { id: 4, img: event4, description: "Happy Christmas" },
            
          ].map(({ id, img, description }) => (
           
            <div key={id} className="bg-gradient-to-t from-blue-100 to-blue-400 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 h-72 mx-2 flex flex-col ">
              
              <img src={img} alt={`Event ${id}`} className="w-full h-52 object-cover rounded-md mb-2" />
              <p className="text-center text-md font-medium text-gray-700">{description}</p>
            
            </div>
            
          ))}
        </Slide>
      </div>
</div>
  );
}

export default HomePage;
