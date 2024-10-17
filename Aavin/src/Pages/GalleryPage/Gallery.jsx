import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../GalleryPage/Gallery.css';
import img1 from '../../assets/GalleryImg/1.jpg';
import img2 from '../../assets/GalleryImg/2.jpg';
import img3 from '../../assets/GalleryImg/3.jpg';
import img4 from '../../assets/GalleryImg/4.jpg';
import img5 from '../../assets/GalleryImg/5.jpg';
import img6 from '../../assets/GalleryImg/6.jpg';
import img7 from '../../assets/GalleryImg/7.jpg';
import img9 from '../../assets/GalleryImg/9.jpg';
import img10 from '../../assets/GalleryImg/10.jpg';
import camera from '../../assets/GalleryImg/aavingalleyphoto.gif';
import camerastaic from '../../assets/GalleryImg/cameraStatic.png';

const Gallery = () => {
  const sectionsRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCamera, setShowCamera] = useState(true); // State to control image visibility

  // Intersection Observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    // Set timeout to switch from camera to camerastaic
    const timer = setTimeout(() => {
      setShowCamera(false);
    }, 1000); // Change image after 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const boxes = [
    { img: img1, title: "About Our Mission", description: "We strive to deliver exceptional quality and innovative solutions for our clients." },
    { img: img2, title: "Our Values", description: "Integrity, excellence, and teamwork are at the heart of everything we do." },
    { img: img3, title: "Our Journey", description: "Discover how we evolved over the years and our impact on the industry." },
    { img: img5, title: "Community Engagement", description: "We actively engage with our community to make a positive impact." },
    { img: img6, title: "Innovation Focus", description: "Innovation drives us to create cutting-edge solutions for our clients." },
    { img: img7, title: "Our Commitment", description: "We are committed to continuous improvement and excellence in our services." },
    { img: img9, title: "Customer Satisfaction", description: "Our clients' satisfaction is our top priority, driving us to improve continually." },
    { img: img10, title: "Future Vision", description: "We aim to lead our industry into the future with innovative solutions." },
    { img: img4, title: "Future Vision", description: "We aim to lead our industry into the future with innovative solutions." },
    { img: img1, title: "About Our Mission", description: "We strive to deliver exceptional quality and innovative solutions for our clients." },
    { img: img2, title: "Our Values", description: "Integrity, excellence, and teamwork are at the heart of everything we do." },
    { img: img3, title: "Our Journey", description: "Discover how we evolved over the years and our impact on the industry." },
    { img: img5, title: "Community Engagement", description: "We actively engage with our community to make a positive impact." },
    { img: img6, title: "Innovation Focus", description: "Innovation drives us to create cutting-edge solutions for our clients." },
    { img: img7, title: "Our Commitment", description: "We are committed to continuous improvement and excellence in our services." },
    { img: img9, title: "Customer Satisfaction", description: "Our clients' satisfaction is our top priority, driving us to improve continually." },
    { img: img10, title: "Future Vision", description: "We aim to lead our industry into the future with innovative solutions." },
    { img: img4, title: "Future Vision", description: "We aim to lead our industry into the future with innovative solutions." },
    { img: img10, title: "Future Vision", description: "We aim to lead our industry into the future with innovative solutions." },
    { img: img4, title: "Future Vision", description: "We aim to lead our industry into the future with innovative solutions." },
  ];

  // Handlers for popup functionality
  const handleBoxClick = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closePopup = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? boxes.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === boxes.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={`gallery-container ${isOpen ? 'blur-background' : ''}`}>
      <div className="about-section p-4 pt-60 px-8 md:px-36">
        {/* Main heading section */}
        <div className="intro-section text-center mb-8 fade-in" ref={el => sectionsRef.current[0] = el}>
          <div className="relative inline-block">
            <h1
              className="section-title underline-title text-2xl font-bold relative text-black p-2 pr-6"
              style={{ fontSize: '1.5rem', zIndex: 1 }}
            >
              Welcome to Our Gallery
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-transparent">y</span>
            </h1>
            {showCamera ? (
              <img
                src={camera}
                alt="Camera icon"
                className="absolute w-12 h-14 opacity-50 bottom-2 right-8" // Position the image at the bottom right
                style={{ zIndex: -1 }} // Keep image behind the text
              />
            ) : (
              <img src={camerastaic} alt="Static camera" className="absolute w-12 h-14 bottom-0 right-0 opacity-95" style={{ zIndex: -1 }} />
            )}
          </div>

          <p className="section-description text-black mt-2">
            Learn more about our journey and the key highlights of our team. Explore the details in the boxes below!
          </p>
        </div>

        {/* Grid layout for image and details section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {boxes.map((box, index) => (
            <div
              key={index}
              className="flex-box fade-in"
              ref={el => sectionsRef.current[index + 1] = el}
              onClick={() => handleBoxClick(index)} // Open popup on click
            >
              <div className="box-content bg-white shadow-lg rounded-lg p-4 relative overflow-hidden border" style={{ width: '250px', height: '300px' }}>
                <div className="image-wrapper p-2">
                  <img src={box.img} alt={box.title} className="box-image mb-2 rounded-lg" style={{ width: '100%', height: '70%' }} />
                </div>
                <div className="details-overlay text-black">
                  <h4 className="text-lg font-semibold ">{box.title}</h4>
                  <p>{box.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        {isOpen && (
          <div className="modal-overlay text-black pt-18">
            <div className="modal-content relative bg-white pl-2 pr-1 pt-10 pb-10 rounded-lg shadow-lg">
              <button className="absolute top-2 right-2 text-black" onClick={closePopup}>✖</button>
              <div className="flex items-center justify-between">
                <button className="btn-prev flex items-center text-sm" onClick={goToPreviousImage} aria-label="Previous Image">
                  <FaChevronLeft className="mr-1" />
                </button>
                <img src={boxes[currentImageIndex].img} alt={boxes[currentImageIndex].title} className="modal-image mb-4 rounded-lg" style={{ width: '500px', height: 'auto' }} />
                <button className="btn-next flex items-center text-sm" onClick={goToNextImage} aria-label="Next Image">
                  <FaChevronRight className="ml-1" />
                </button>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-black mt-4">{boxes[currentImageIndex].title}</h4>
              <p>{boxes[currentImageIndex].description}</p>
            </div>
          </div>
        )}

        {/* Footer section */}
        <div className="footer-section text-center mt-8 fade-in" ref={el => sectionsRef.current[boxes.length + 1] = el}>
          <h3 className="footer-heading text-2xl font-bold text-black">Thank You for Visiting!</h3>
          <p className="footer-text mt-2 text-black">
            We hope you found our information helpful. Stay tuned for more exciting updates and content from our team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
