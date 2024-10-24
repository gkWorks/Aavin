import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../GalleryPage/Gallery.css';
import camerastaic from '../../assets/GalleryImg/cameraStatic.png';
import camera from '../../assets/GalleryImg/aavingalleyphoto.gif';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const [selectedGalleryDetails, setSelectedGalleryDetails] = useState({ title: '', description: '' });
  const [showCamera, setShowCamera] = useState(true); // State to control image visibility

  // Fetch gallery items on component mount
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gallery');
        setGalleryItems(response.data);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      }
    };
    fetchGalleryItems();
  }, []);

  // Handle box click: fetch details and images of the selected gallery item
  const handleBoxClick = async (galleryId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/gallery/${galleryId}`);
      const { title, description, images } = response.data;

      setSelectedGalleryImages(images); // Set the gallery images
      setSelectedGalleryDetails({ title, description }); // Set title and description
      setCurrentImageIndex(0); // Reset to first image
      setIsOpen(true); // Open popup
      document.body.style.overflow = 'hidden'; // Disable scrolling when popup is open
    } catch (error) {
      console.error('Error fetching gallery item details:', error);
    }
  };

  const closePopup = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedGalleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedGalleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Set timeout to switch from camera to camerastaic
    const timer = setTimeout(() => {
      setShowCamera(false);
    }, 1000); // Change image after 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  useEffect(() => {
    const handleScrollAnimation = () => {
      const boxes = document.querySelectorAll('.box-content');
      boxes.forEach((box, index) => {
        const boxPosition = box.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Trigger animation when the box is in view
        if (boxPosition < windowHeight - 100) {
          box.style.animation = `fadeIn 1s ease-in-out forwards ${index * 0.1}s`;
        }
      });
    };

    window.addEventListener('scroll', handleScrollAnimation);

    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);

  return (
    <div className={`gallery-container ${isOpen ? 'blur-background' : ''}`}>
      <div className="about-section p-4 pt-60 px-8 md:px-36">
        {/* Main heading section */}
        <div className="intro-section text-center mb-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
  {galleryItems.map((box, index) => (
    <div
      key={box._id}
      className={`box-content ${index < 4 ? 'no-animation' : ''} bg-white shadow-lg rounded-lg p-2 relative overflow-hidden border cursor-pointer`}
      onClick={() => handleBoxClick(box._id)}
      style={{ width: '230px', height: '250px', opacity: index < 4 ? 1 : 0 }} // First row should have full opacity initially
    >
      <div className="image-wrapper p-2">
        <img
          src={`http://localhost:5000${box.images[0]}`}
          alt={box.title}
          className="box-image mb-2 rounded-lg"
          style={{ width: '250px', height: '150px', objectFit: 'cover' }}
        />
      </div>
      <div className="details-overlay text-black">
        <h4 className="text-lg font-semibold">{box.title}</h4>
        <p>{box.description}</p>
      </div>
    </div>
  ))}
</div>


        {/* Popup Modal */}
        {isOpen && selectedGalleryImages.length > 0 && (
          <div className="modal-overlay text-black pt-18">
            <div className="modal-content relative bg-white pl-2 pr-1 pt-10 pb-10 rounded-lg shadow-lg">
              <button className="absolute top-2 right-2 text-black" onClick={closePopup}>✖</button>
              <div className="flex items-center justify-between">
                <button className="btn-prev flex items-center text-sm" onClick={goToPreviousImage} aria-label="Previous Image">
                  <FaChevronLeft className="mr-1" />
                </button>
                <img
                  src={`http://localhost:5000${selectedGalleryImages[currentImageIndex]}`} // Display current image
                  alt={`Gallery Image ${currentImageIndex + 1}`}
                  className="modal-image mb-1 rounded-lg"
                  style={{ width: '500px', height: 'auto' }}
                />
                <button className="btn-next flex items-center text-xs" onClick={goToNextImage} aria-label="Next Image">
                  <FaChevronRight className="ml-1" />
                </button>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-black mt-2 pl-3">
                {selectedGalleryDetails.title}
              </h4>
              <p className='font-thin text-xs pl-5 pr-5'>{selectedGalleryDetails.description}</p>
            </div>
          </div>
        )}
        <div className="footer-section text-center mt-8">
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
