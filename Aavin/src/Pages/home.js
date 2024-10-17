import React, { useState, useEffect, useRef } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import slide1 from "../assets/Home Page slider/slider1.jpg";
import slide2 from "../assets/Home Page slider/tnpcb_banner_slider6.jpg";
import slide3 from "../assets/Home Page slider/tnpcb_banner_slider7.jpg";
import "./home.css";
import EventModal from "../models/EventModal";
import ProductModal from "../models/ProductModal";
import axios from "axios";



const home = () => {
  const images = [slide1, slide2, slide3];
  const [events, setEvents] = useState([]);
  const [eventIndex, setEventIndex] = useState(0);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ img: "", description: "" });
  const [isEditMode, setIsEditMode] = useState(false); // New state for edit mode
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ img: "", name: "", description: "" });
  const [startIndex, setStartIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const productRef = useRef(null);
  const notificationRefs = useRef([]);
  const eventRef = useRef(null);

  const handleNextEvent = () => {
    setEventIndex((prevIndex) => (prevIndex + 3) % events.length);
  };

  const handlePrevEvent = () => {
    setEventIndex(
      (prevIndex) => (prevIndex - 3 + events.length) % events.length
    );
  };

  const visibleEvents = events
    .slice(eventIndex, eventIndex + 3)
    .concat(events.slice(0, Math.max(0, eventIndex + 3 - events.length)));

  // Open modal for adding new event
  const handleAddEvent = () => {
    setNewEvent({ img: "", description: "" });
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  // Open modal for editing an existing event
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent(event);
    setShowEventModal(true);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setNewProduct({ img: "", name: "", description: "" });
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    setShowProductModal(true);
  };

  const handleSaveProduct = async (product) => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    if (product.img) {
      formData.append('img', product.img);
    }

    if (selectedProduct) {
      // Update existing product
      try {
        const response = await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const updatedProducts = products.map((prod) =>
          prod._id === selectedProduct._id ? response.data : prod
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    } else {
      // Add new product
      try {
        const response = await axios.post("http://localhost:5000/api/products", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setProducts([...products, response.data]);
      } catch (error) {
        console.error("Failed to add product:", error);
      }
    }

    setShowProductModal(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (productId) => {
    console.log("Attempting to delete product with ID:", productId); // Log the productId
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId.trim()}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };
  

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
      console.log("Fetched Events:", response.data); // Log fetched events
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events on component mount
  }, []);

  // Save new or edited event
  const handleSaveEvent = async (event) => {
    if (selectedEvent) {
      // Update existing event
      try {
        const response = await axios.put(
          `http://localhost:5000/api/events/${selectedEvent._id}`,
          event
        );
        const updatedEvents = events.map((ev) =>
          ev._id === selectedEvent._id ? response.data : ev
        );
        setEvents(updatedEvents);
      } catch (error) {
        console.error("Failed to update event:", error);
      }
    } else {
      // Add new event
      try {
        const response = await axios.post(
          "http://localhost:5000/api/events",
          event
        ); // Use full URL here
        setEvents([...events, response.data]);
      } catch (error) {
        console.error("Failed to add event:", error);
      }
    }

    setShowEventModal(false);
    setSelectedEvent(null);

    // Fetch the latest events again after adding/updating
    fetchEvents();
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
    console.log("Edit Mode:", !isEditMode); // Log the current state
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const visibleProducts = products
    .slice(startIndex, startIndex + 4)
    .concat(products.slice(0, Math.max(0, startIndex + 4 - products.length)));

  const handleScroll = () => {
    if (productRef.current) {
      const rect = productRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    notificationRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          ref.classList.add("visible");
        } else {
          ref.classList.remove("visible");
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    if (productRef.current) {
      observer.observe(productRef.current);
    }

    if (eventRef.current) {
      observer.observe(eventRef.current);
    }

    notificationRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (productRef.current) observer.unobserve(productRef.current);
      if (eventRef.current) observer.unobserve(eventRef.current);
      notificationRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="homepage-container">
      {/* Slider Section */}
      <Slide
        easing="ease"
        duration={3000}
        transitionDuration={700}
        prevArrow={<button className="custom-button left-5">Prev</button>}
        nextArrow={<button className="custom-button right-5">Next</button>}
      >
        {images.map((each, index) => (
          <div key={index} className="each-slide">
            <div className="slide-overlay">
              <img
                src={each}
                alt={`slide-${index}`}
                className="slide-image w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </Slide>
        {/* Products Section */}
        
        <div className="product-container">
        <h2 className="text-2xl font-bold">Our Products</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
        <div className="flex flex-wrap">
        {products.map((product) => (
  <div key={product._id} className="product-card">
    <img src={`http://localhost:5000/${product.img}`} alt={product.name} className="product-image" />
    <h3 className="product-name">{product.name}</h3> {/* Apply a different class here */}
    <p className="product-description">{product.description}</p> {/* Separate class for description */}
    <div className="button-container"> {/* Wrap buttons for better styling */}
      <button onClick={() => handleEditProduct(product)}>Edit</button>
      <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
    </div>
  </div>
))}

        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        show={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSave={handleSaveProduct}
        product={newProduct}
        setProduct={setNewProduct}
      />
      {/* Notification Section */}
      <div className="notification-container mt-6">
        <div className="text-center mb-4 ">
          <h2 className="text-2xl font-bold animate-fade-in">Notifications</h2>
          <span className="block h-1 bg-blue-400 mt-1 mx-auto w-36"></span>
        </div>
        <div className="flex justify-between">
          <div
            ref={(el) => (notificationRefs.current[0] = el)}
            className="notification-box whats-new"
          >
            <h3 className="text-white">What's New</h3>
            <div className="scrolling-text">
              <p>Your new updates and notifications go here.</p>
            </div>
          </div>
          <div
            ref={(el) => (notificationRefs.current[1] = el)}
            className="notification-box tender-notification"
          >
            <h3 className="text-white">Tender Notification</h3>
            <div className="scrolling-text">
              <p>Latest tenders and related information here.</p>
            </div>
          </div>
          <div
            ref={(el) => (notificationRefs.current[2] = el)}
            className="notification-box employment-notification"
          >
            <h3 className="text-white">Employment Notification</h3>
            <div className="scrolling-text">
              <p>Current job openings and announcements here.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Section */}
      <div className="event-container fade-in-up mt-8 mb-6 w-full">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-center ml-auto text-2xl font-bold animate-fade-in">
      Our Events
    </h2>
    <div>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={handleAddEvent}
    >
      Add Event
    </button>
    <button
      className="bg-yellow-500 text-white px-4 py-2 rounded-md"
      onClick={handleEditModeToggle}
    >
      {isEditMode ? "Cancel Edit" : "Edit"}
    </button>
    </div>
  </div>
  <div className="flex justify-between items-center">
    <button
      className="Eventcustom-button left-0 mr-4"
      onClick={handlePrevEvent}
    >
      ❮
    </button>
    <div className="flex gap-28 text-center mt-2 p-2 bg-white">
  {visibleEvents.map((event, index) => (
    <div key={index} className="event-item">
      <img
        src={event.img}
        alt={`event-${index}`}
        className="w-full h-auto object-cover rounded-md"
      />
      <div className="event-description-container mt-2 p-2 bg-light-gray rounded-md">
                  <p className="text-sm font-semibold">{event.description}</p>
      </div>
      {isEditMode && (
        <>
          <button
            className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => handleEditEvent(event)}
          >
            Edit
          </button>
          <button
            className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => handleDeleteEvent(event._id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  ))}
</div>
    <button
      className="Eventcustom-button right-0 ml-4"
      onClick={handleNextEvent}
    >
      ❯
    </button>
  </div>
</div>
      {/* Event Modal */}
      <EventModal
        show={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSave={handleSaveEvent}
        event={newEvent}
        setEvent={setNewEvent}
      />
    </div>
  );
};

export default home;
