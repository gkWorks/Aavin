import { FaRegCalendarAlt, FaUserShield, FaAngleRight, FaAngleLeft } from 'react-icons/fa'; // Import necessary icons
import milkGif from '../../assets/AboutPageImg/milky.gif';
import { useEffect, useState } from 'react';
import img1 from '../../assets/Activement/1.jpg';
import img2 from '../../assets/Activement/2.jpg';
import img3 from '../../assets/Activement/3.jpg';
import img4 from '../../assets/Activement/4.jpg';
import img5 from '../../assets/Activement/5.jpg';
import img6 from '../../assets/Activement/6.jpg';
import img7 from '../../assets/Activement/7.jpg';
import img8 from '../../assets/Activement/8.jpg';
import img9 from '../../assets/Activement/9.jpg';
import img10 from '../../assets/Activement/10.jpg';
import milky from "../../assets/Activement/activement.jpg";

const Achievement = () => {
  const [loading, setLoading] = useState(true);
  const today = new Date().toLocaleDateString(); // Get today's date
  const [currentPage, setCurrentPage] = useState(0); // Track the current page of images
  const imagesPerPage = 5; // Set number of images per page

  // Simulate loading before rendering the page
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white pt-40">
        <img src={milkGif} alt="Loading..." className="w-52" />
      </div>
    );
  }

  const contentData = [
    { image: img1, title: 'District Level Sports competition', description: 'A grand competition for district level sports.' },
    { image: img2, title: 'State Science Fair', description: 'Participated in the prestigious state-level science fair.' },
    { image: img3, title: 'Cultural Event', description: 'Showcased various cultural talents in this event.' },
    { image: img4, title: 'National Debate Championship', description: 'Engaged in debates with participants across the nation.' },
    { image: img5, title: 'Inter-school Quiz Contest', description: 'An exciting quiz contest between different schools.' },
    { image: img6, title: 'Charity Fundraiser Event', description: 'Organized a fundraiser for underprivileged communities.' },
    { image: img1, title: 'District Level Sports competition', description: 'A grand competition for district level sports.' },
    { image: img2, title: 'State Science Fair', description: 'Participated in the prestigious state-level science fair.' },
    { image: img3, title: 'Cultural Event', description: 'Showcased various cultural talents in this event.' },
    { image: img4, title: 'National Debate Championship', description: 'Engaged in debates with participants across the nation.' },
    { image: img5, title: 'Inter-school Quiz Contest', description: 'An exciting quiz contest between different schools.' },
    { image: img6, title: 'Charity Fundraiser Event', description: 'Organized a fundraiser for underprivileged communities.' },
  ];

  // Handler functions for pagination
  const nextPage = () => {
    if ((currentPage + 1) * imagesPerPage < contentData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <img
          src={milky} // Adjust this image source to match your hero image
          alt="Achievements & Activities"
          className="fixed top-0 w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="absolute inset-0 flex justify-start items-center pl-7 pb-11">
          <h1 className="text-white text-3xl font-bold pl-32 pb-16">
            ACHIEVEMENTS & ACTIVITIES
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative bg-white p-6 mt-[-45vh]">
        <div className="flex flex-wrap space-x-5 pt-8">
          {/* Left side: Images and Descriptions */}
          <div className="w-full md:w-3/5 space-y-6 pr-8 pl-32">
            {contentData.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage).map((content, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg space-y-3 transition-transform transform hover:scale-105 duration-300 ease-in-out animate-slide-in">
                <h1 className="text-2xl">{content.title}</h1>
                <p className="text-black text-lg pl-4 flex items-center mt-2">
                  <FaUserShield className="mr-2" /> {/* Add admin icon */}
                  Admin | <FaRegCalendarAlt className="ml-2 mr-2" /> {today} {/* Date */}
                </p>
                <img src={content.image} alt={`Event ${index + 1}`} className="w-full rounded-lg" />
                <p className="text-black mt-2">{content.description}</p>
                <hr className="border-black" /> {/* Back line */}
              </div>
            ))}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="text-blue-600 disabled:opacity-50"
              >
                <FaAngleLeft /> {/* Left arrow */}
              </button>
              <div>
                Page {currentPage + 1} of {Math.ceil(contentData.length / imagesPerPage)}
              </div>
              <button
                onClick={nextPage}
                disabled={(currentPage + 1) * imagesPerPage >= contentData.length}
                className="text-blue-600 disabled:opacity-50"
              >
                <FaAngleRight /> {/* Right arrow */}
              </button>
            </div>
          </div>

          {/* Right side: Recent Images */}
          <div className="w-full md:w-1/3 space-y-10 pr-14 pt-16">
            <div>
              <h2 className="text-3xl font-bold pb-5">Categories</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="flex items-center pb-3">
                  <FaAngleRight className="mr-2" /> {/* Add pointer icon */}
                  <a href="home" className="bg-gradient-to-r from-blue-200 to-green-200 hover:underline pl-5 pr-12">Blog</a>
                </li>
                <li className="flex items-center pb-3">
                  <FaAngleRight className="mr-2" /> {/* Add pointer icon */}
                  <a href="gallery" className="bg-gradient-to-r from-blue-200 to-green-200 hover:underline pl-5 pr-8">Gallery</a>
                </li>
                <li className="flex items-center pb-3">
                  <FaAngleRight className="mr-2" /> {/* Add pointer icon */}
                  <a href="#" className="bg-gradient-to-r from-blue-200 to-green-200 hover:underline pl-5 pr-7">Images</a>
                </li>
                <li className="flex items-center">
                  <FaAngleRight className="mr-2" /> {/* Add pointer icon */}
                  <a href="https://youtu.be/VUwtYnQsK2k?si=rrj7Fo_vX2kUm0bb" className="bg-gradient-to-r from-blue-200 to-green-200 hover:underline pl-5 pr-10">Video</a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold">Recent Images</h2> {/* Updated heading */}
              <p className="text-lg">Check out our latest images showcasing our activities and achievements.</p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {[img7, img8, img9, img10].map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="relative">
                      <img src={image} alt={`Gallery ${index + 1}`} className="w-full rounded-lg opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-100 transition-opacity duration-500 group-hover:opacity-0">
                        <p className="text-white text-lg flex items-center">
                          <FaUserShield className="mr-2" /> {/* Add admin icon */}
                          Admin | <FaRegCalendarAlt className="ml-2 mr-2" /> {today} {/* Date */}
                        </p>
                        <div className="mt-2">
                          <p className="text-white pl-4 pt-5">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div>
              <h2 className="text-3xl font-bold pt-6">Videos</h2>
              <p className="text-lg">Watch the highlights of our recent activities.</p>
              <div className="mt-4">
                <iframe
                  className="w-full h-64 rounded-lg"
                  src="https://www.youtube.com/embed/VUwtYnQsK2k"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4">
              <p className="text-lg pt-5">Watch the highlights of our recent activities.</p>
                <iframe
                  className="w-full h-64 rounded-lg"
                  src="https://www.youtube.com/embed/VUwtYnQsK2k"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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

export default Achievement;
