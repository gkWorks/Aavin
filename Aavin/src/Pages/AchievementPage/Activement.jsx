import { FaRegCalendarAlt, FaUserShield, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import milkGif from '../../assets/AboutPageImg/milky.gif';
import { useEffect, useState } from 'react';

import milky from "../../assets/Activement/activement.jpg";
import axios from 'axios';

const Activement = () => {
  const [loading, setLoading] = useState(true);
  const [dactivements, setDactivements] = useState([]);
  const [recentImages, setRecentImages] = useState([]);
  const today = new Date().toLocaleDateString();
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 5;
  const [youtubeLinks, setYoutubeLinks] = useState([]); // State to store YouTube links
  // Fetch all dactivements and YouTube links from the database
  const fetchDactivements = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const [activementsResponse, youtubeLinksResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/dactivement'),
        axios.get('http://localhost:5000/api/get-youtube-links') // Fetch YouTube links
      ]);
      
      setDactivements(activementsResponse.data.allActivements); // Set activements
      setRecentImages(activementsResponse.data.recentImages); // Set recent images
      setYoutubeLinks(youtubeLinksResponse.data.youtubeLinks); // Set YouTube links
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchDactivements();
  }, []);

  // Pagination handlers
  const nextPage = () => {
    if ((currentPage + 1) * imagesPerPage < dactivements.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white pt-40">
        <img src={milkGif} alt="Loading..." className="w-52" />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <img src={milky} alt="Achievements & Activities" className="fixed top-0 w-full h-full object-cover rounded-lg" />
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="absolute inset-0 flex justify-start items-center pl-7 pb-11">
          <h1 className="text-white text-3xl font-bold pl-32 pb-16">ACHIEVEMENTS & ACTIVITIES</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative bg-white p-6 mt-[-45vh]">
        <div className="flex flex-wrap space-x-5 pt-8">
          {/* Left side: Images and Descriptions */}
          <div className="w-full md:w-3/5 space-y-6 pr-8 pl-32">
            {dactivements.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage).map((content, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg space-y-3 transition-transform transform hover:scale-105 duration-300 ease-in-out animate-slide-in">
                <h1 className="text-2xl">{content.heading}</h1>
                <p className="text-black text-lg pl-4 flex items-center mt-2">
                  <FaUserShield className="mr-2" />
                  Admin | <FaRegCalendarAlt className="ml-2 mr-2" /> {content.date}
                </p>
                <img src={content.image} alt={`Event ${index + 1}`} className="w-full rounded-lg" />
                <p className="text-black mt-2">{content.description}</p>
                <hr className="border-black" />
              </div>
            ))}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-4">
              <button onClick={prevPage} disabled={currentPage === 0} className="text-blue-600 disabled:opacity-50">
                <FaAngleLeft />
              </button>
              <div>
                Page {currentPage + 1} of {Math.ceil(dactivements.length / imagesPerPage)}
              </div>
              <button onClick={nextPage} disabled={(currentPage + 1) * imagesPerPage >= dactivements.length} className="text-blue-600 disabled:opacity-50">
                <FaAngleRight />
              </button>
            </div>
          </div>

          {/* Right side: Recent Images */}
          <div className="w-full md:w-1/3 space-y-10 pr-14 pt-16">
            <div>
              <h2 className="text-3xl font-bold pb-5">Categories</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="flex items-center pb-3">
                  <FaAngleRight className="mr-2" />
                  <a href="home" className="bg-gradient-to-r from-blue-200 to-green-200 hover:underline pl-5 pr-12">Blog</a>
                </li>
                <li className="flex items-center pb-3">
                  <FaAngleRight className="mr-2" />
                  <a href="gallery" className="bg-gradient-to-r from-blue-200 to-green-200 hover:underline pl-5 pr-8">Gallery</a>
                </li>
                <li className="flex items-center pb-3">
                  <FaAngleRight className="mr-2" />
                  <a href="#" className="bg-gradient-to-r from-blue-200 to-green-200 hover:underline pl-5 pr-7">Images</a>
                </li>
                <li className="flex items-center">
                  <FaAngleRight className="mr-2" />
                  <a href="https://youtu.be/VUwtYnQsK2k?si=rrj7Fo_vX2kUm0bb" className="bg-gradient-to-r from-blue-200 to-green-200 hover:underline pl-5 pr-10">Video</a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold">Recent Images</h2>
              <p className="text-lg">Check out our latest images showcasing our activities and achievements.</p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {recentImages.map((image, index , ) => (
                  <div key={index} className="relative group">
                    <div className="relative">
                      <img src={image.image} alt={`Gallery ${index + 1}`} className="w-full rounded-lg opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-100 transition-opacity duration-500 group-hover:opacity-0">
                        <p className="text-white text-lg flex items-center">
                          <FaUserShield className="mr-2" />
                          Admin | <FaRegCalendarAlt className="ml-2 mr-2" /> {image.date}
                        </p>
                        <div className="mt-2">
                          <p className="text-white pl-4 pt-5 px-8 opacity-40">{image.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {/* Video Section with YouTube Links */}
              <div>
                  <h2 className="text-3xl font-bold pt-6">Videos</h2>
                  <p className="text-lg">Watch the highlights of our recent activities.</p>
                  <div className="mt-4">
                    {youtubeLinks.map((link, index) => (
                      <iframe
                        key={index}
                        className="w-full h-64 rounded-lg mb-6"
                        src={`${link}`}
                        title={`YouTube video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ))}
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activement;
