import React, { useRef, useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./home.css";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useLanguage } from '../TranslateBtn/LanguageContext'; // Import the context
  
const HomePage = () => {
  const slideRef = useRef();
  const productRef = useRef();
  const [sliderImages, setSliderImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [employmentNotifications, setEmploymentNotifications] = useState([]);
  const colors = [
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-red-200",
    "bg-purple-200",
    "bg-teal-200",
    "bg-pink-200",
    "bg-orange-200",
  ];

  // Fetch slider images from the backend
  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/home-slider/"
        );
        const images = response.data.map((image) => ({
          id: image._id,
          url: `data:image/jpeg;base64,${image.imageUrl}`, // Adjust if using a different format
        }));
        setSliderImages(images);
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };

    fetchSliderImages();
  }, []);

  // Fetch products from the database when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/home-product/"
        );
        const productData = response.data.map((product) => ({
          id: product._id,
          name: product.name,
          details: product.details,
          img: product.imageUrl, // Adjust if needed
        }));
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []); // Ensure this runs on mount

  // Fetch Events from the database when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/home-event/"
        );
        const eventData = response.data.map((event) => ({
          id: event._id,
          details: event.details,
          imageUrl: event.imageUrl,
        }));
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Fetch whats new Notification from the database when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/what-new");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch employment notifications when the component mounts
  useEffect(() => {
    const fetchEmploymentNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/employnotification"
        ); // Adjust the URL as needed
        const data = await response.json();
        setEmploymentNotifications(data);
      } catch (error) {
        console.error("Error fetching employment notifications:", error);
      }
    };

    fetchEmploymentNotifications();
  }, []);

  const goNext = () => {
    slideRef.current.goNext();
  };

  const goBack = () => {
    slideRef.current.goBack();
  };

  const { isRegional } = useLanguage();

  return (
    <div className="relative w-full bg-gray-100 overflow-hidden mt-52">
      {/* Slider Section */}
      <div>
        <Slide
          ref={slideRef}
          easing="ease"
          duration={3000}
          arrows={false}
          autoplay={true}
          cssClass="animate__animated animate__fadeIn"
        >
          {sliderImages.length > 0 ? (
            sliderImages.map((each) => (
              <div
                key={each.id}
                className="flex justify-center items-center h-96 bg-cover bg-center"
              >
                <img
                  src={each.url}
                  alt={`Slide ${each.id}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))
          ) : (
            <p>Loading images...</p>
          )}
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
      <div className="relative w-full py-4 bg-gray-100 overflow-hidden">
        <h2 className="text-2xl font-bold text-center mb-6 mt-8 text-blue-600">
        {isRegional ? "எங்கள் தயாரிப்பு" : "Our Product"}
        </h2>

        <Slide
          ref={productRef}
          slidesToShow={4}
          slidesToScroll={4}
          autoplay={false}
          duration={0}
          cssClass="animate__animated animate__fadeIn"
          easing="ease"
        >
          {products.length > 0 ? (
            products.map(({ id, name, details, img }, index) => (
              <motion.div
                key={id}
                className={`p-4 mx-2 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 h-56 ${
                  colors[index % 8]
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex">
                  <img
                    src={`http://localhost:5000${img}`}
                    alt={name}
                    className="w-40 h-48 object-cover rounded-lg mr-4 hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src = "path/to/fallback/image.jpg";
                    }}
                  />
                  <div className="mt-10">
                    <h3 className="text-lg font-bold">{name}</h3>
                    <p className="text-sm text-gray-700">{details}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </Slide>
      </div>

      {/* Notification Container */}
      <div className="relative w-full bg-gray-100 overflow-hidden">
        <h2 className="text-2xl font-bold text-center mt-8 text-blue-600">
          {isRegional ? "அறிவிப்புகள்" : "Notifications"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
          {/* What's New Box */}
          <motion.div
            className="bg-gradient-to-t from-blue-200 to-blue-400 p-4 rounded-lg shadow-md h-72 flex flex-col"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-t from-blue-200 to-blue-400 p-4 rounded-lg h-72 flex flex-col">
              <h3 className="text-indigo-700 text-lg font-bold mb-2 hover:scale-105 transition duration-300">
              {isRegional ? "புதிய அறிக்கைகள்" : "What's New"}
              </h3>
              <div className="overflow-hidden flex-grow">
                <div className="animate-text text-white text-md font-medium ">
                  {notifications.map((notification, index) => (
                    <p key={index} className="mb-5">
                      {notification.text}
                    </p>
                  ))}
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
            <div className="bg-gradient-to-t from-green-200 to-green-400 p-4 rounded-lg h-72 flex flex-col">
              <h3 className="text-teal-700 text-lg font-bold mb-2 hover:scale-105 transition duration-300">
                {isRegional ? "வேலைவாய்ப்பு அறிவிப்புகள்" : "Employment Notifications"}
              </h3>
              <div className="overflow-hidden flex-grow">
                <div className="animate-text text-white text-md font-medium">
                  {employmentNotifications.length > 0 ? (
                    employmentNotifications.map((notification) => (
                      <div key={notification._id} className="mb-5">
                        <p>{notification.text}</p>
                        {notification.pdfUrl && (
                          <a
                            href={`http://localhost:5000/${notification.pdfUrl}`} // Adjust this path as necessary
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                          >
                            View PDF
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No employment notifications available at the moment.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Events Container */}
      <div className="relative w-full bg-gray-100 overflow-hidden mt-10 mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {isRegional ? "எங்கள் நிகழ்வுகள்" : "Our Events"}
        </h2>
        <Slide
          slidesToShow={3}
          slidesToScroll={1}
          autoplay={false}
          ref={productRef}
          easing="ease"
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gradient-to-t from-blue-100 to-blue-400 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 h-72 mx-2 flex flex-col"
            >
              <img
                src={event.imageUrl}
                alt="Event"
                className="w-full h-52 object-cover rounded-md mb-2"
              />
              <p className="text-center text-md font-medium text-gray-700">
                {event.details}
              </p>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default HomePage;
