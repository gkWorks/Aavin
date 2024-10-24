import React, { useEffect, useState, useRef } from 'react';
import aboutimg from '../../assets/AboutPageImg/about.jpg';
import milkGif from '../../assets/AboutPageImg/milky.gif';
import pointerGif from '../../assets/AboutPageImg/giphy.gif'; // GIF
import pointerStatic from '../../assets/AboutPageImg/static.gif'; // Static version of the pointer 
import '../AboutPage/About.css';
import { FaHandPointRight } from 'react-icons/fa';
import numplaceholder from '../../assets/AboutPageImg/numholder.webp'
import arrowbox from '../../assets/AboutPageImg/arrowbox.gif';
import dobule from '../../assets/AboutPageImg/dobule.png';
import { useInView } from 'react-intersection-observer';

const Aboutpage = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [cadreStrength, setCadreStrength] = useState(0);
  const [employees, setEmployees] = useState(0);
  const [cadreYear, setCadreYear] = useState(0);
  const [cadreBoard, setCadreBoard] = useState(0);
  const [aboutContent, setAboutContent] = useState({
    PREAMBLE: 'Loading...',
    INTRODUCTION: 'Loading...',
    MINISTER: 'Loading...',
    PRINCIPAL_SECRETARY: 'Loading...',
    COMMISSIONER: 'Loading',
    UNION_ORGANIZATION_DETAILS: {
      dateOfRegistration: 'Loading...',
      phoneNo: 'Loading...',
      faxNo: 'Loading...',
      email: 'Loading...',
      website: 'Loading...',
      UnionregistrationNo: '',
      FSSAILicenseNo: '',
      Dated: '',
      BoardOfDirectors: '',
      YearofEstablishment: '',
      TotalCadreStrength: '',
      NoofEmployeesworking: ''
    },
  });
  const [fetchedImages, setFetchedImages] = useState([]);
  const headingsRef = useRef([]);
  const { ref: leftRef, inView: leftVisible } = useInView({ triggerOnce: true });

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        setIsScrolling(true);
        setHasScrolled(true);
      }

      const windowHeight = window.innerHeight;
      headingsRef.current.forEach((heading) => {
        const headingPosition = heading.getBoundingClientRect().top;
        if (headingPosition < windowHeight - 100) {
          heading.classList.add('animate-underline');
        } else {
          heading.classList.remove('animate-underline');
        }
      });

      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/about');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAboutContent(data);
        setFetchedImages(data.IMAGECONTENT || []);
        setCadreStrength(data.UNION_ORGANIZATION_DETAILS?.TotalCadreStrength || 0);
        setEmployees(data.UNION_ORGANIZATION_DETAILS?.NoofEmployeesworking || 0);
        setCadreYear(data.UNION_ORGANIZATION_DETAILS?.YearofEstablishment || 1982);
        setCadreBoard(data.UNION_ORGANIZATION_DETAILS?.BoardOfDirectors || 0);
      } catch (error) {
        console.error('Error fetching content:', error);
        setAboutContent({
          PREAMBLE: 'No preamble available.',
          INTRODUCTION: 'No introduction available.',
          MINISTER: 'No minister available.',
          PRINCIPAL_SECRETARY: 'No principal secretary available.',
          COMMISSIONER: 'No commissioner available.',
          UNION_ORGANIZATION_DETAILS: {
            dateOfRegistration: 'No details available.',
            phoneNo: 'No details available.',
            faxNo: 'No details available.',
            email: 'No details available.',
            website: 'No details available.',
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

    // Count increment animation
    useEffect(() => {
      if (hasScrolled) {
        const incrementCount = (target, setter, delay) => {
          let count = 0;
          const interval = setInterval(() => {
            if (count < target) {
              count++;
              setter(count);
            } else {
              clearInterval(interval);
            }
          }, delay);
        };
  
        incrementCount(cadreStrength, setCadreStrength, 100);
        incrementCount(employees, setEmployees, 100);
        incrementCount(cadreYear, setCadreYear, 2);
        incrementCount(cadreBoard, setCadreBoard, 200);
      }
    }, [hasScrolled]);
  
    if (loading) {
      return <div>Loading...</div>;
    }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white pt-40">
        <img src={milkGif} alt="Loading..." className="w-52" />
      </div>
    );
  }

  return (
    <div className="relative ">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden ">
        <img
          src={aboutimg}
          alt="About Us"
          className="fixed top-0 w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="absolute inset-0 flex justify-start items-center pl-7">
          <h1 className="text-white text-4xl font-bold pl-32 pb-32">ABOUT US</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="pl-40 relative bg-white p-6 mt-[-45vh]">
        <h2
          ref={(el) => (headingsRef.current[0] = el)}
          className="text-2xl font-bold mb-4 pt-5 underline-title"
        >
          PREAMBLE
        </h2>
        <p className="text-lg pr-32 pt-4">{aboutContent.PREAMBLE}</p>
        <h2
          ref={(el) => (headingsRef.current[1] = el)}
          className="text-2xl font-bold mb-4 pt-7 underline-title"
        >
          INTRODUCTION
        </h2>
        <p className="text-lg pr-32 pt-4">{aboutContent.INTRODUCTION}</p>
        {/* Departmental Information - Shown after scroll */}
        {hasScrolled && (
          <>
            <h2
              ref={(el) => (headingsRef.current[2] = el)}
              className="text-2xl font-bold mb-4 pt-7 underline-title"
            >
              DEPARTMENTAL SET UP
            </h2> 
            <div className='pr-32 pt-5'>
              <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-lg">
                <ul className='text-lg'>
                  <li className="flex items-center mb-4 pb-5">
                    <img
                      src={isScrolling ? pointerGif : pointerStatic}
                      alt="pointer"
                      className={isScrolling ? "w-10 h-10 mr-4" : "w-6 h-6 mr-4"} // Dynamic size
                    />
                    <span>
                      Honorable Minister for Milk and Dairy Development Department: 
                      <span className='font-bold'>{aboutContent.MINISTER}</span>
                    </span>
                  </li>
                  <li className="flex items-center mb-4 pb-5">
                    <img
                      src={isScrolling ? pointerGif : pointerStatic}
                      alt="pointer"
                      className={isScrolling ? "w-10 h-10 mr-4" : "w-6 h-6 mr-4"}
                    />
                    <span>
                      Principal Secretary to Government (Department of Animal Husbandry, Dairying and Fisheries): 
                      <span className='font-bold'>{aboutContent.PRINCIPAL_SECRETARY}</span>
                    </span>
                  </li>
                  <li className="flex items-center mb-4 pb-5">
                    <img
                      src={isScrolling ? pointerGif : pointerStatic}
                      alt="pointer"
                      className={isScrolling ? "w-10 h-10 mr-4" : "w-6 h-6 mr-4"}
                    />
                    <span>
                      Commissioner for Milk Production and Dairy Development, Managing Director of the Tamilnadu Cooperative Milk Producers Federation Limited: 
                      <span className='font-bold'>{aboutContent.COMMISSIONER}</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Organisational Details */}
              <h2
                ref={(el) => (headingsRef.current[3] = el)}
                className="text-2xl font-bold mb-4 pt-7 underline-title"
              >
                ORGANISATIONAL DETAILS
              </h2>
          <div className="container mx-auto p-8 pt-5 flex space-x-10">
      {/* Left Side Boxes */}
      <div className="w-2/3 flex flex-col space-y-4">
        {/* Box 2 - Two Column Layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Box 1 */}
          <div
            ref={leftRef}
            className={`relative arrow-box overflow-hidden rounded-lg shadow-lg border-2 border-light-blue-500 bg-blue-100 p-4 transition-transform duration-1000 delay-300 ease-in-out ${
                leftVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } scale-on-hover`}
            >
            <img
                src={arrowbox}
                alt="arrow box"
                className="absolute top-4 left-4 w-12 h-10"
                style={{ filter: 'invert(80%) sepia(20%) saturate(300%) hue-rotate(80deg) brightness(120%)' }} // More consistent light green color
                />

            <h2 className="text-xl font-semibold mb-2 pl-8 pt-8">
                 Name & Address of the Milk Federation
            </h2>
            </div>  
          {/* Box 2 */}
          <div
            ref={leftRef}
            className={`relative arrow-box overflow-hidden rounded-lg shadow-lg border-2 border-light-blue-500 bg-green-100 p-4 transition-transform duration-1200 delay-500 ease-in-out ${
              leftVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } scale-on-hover`}
          >
            <img src={dobule} alt="Double Image" className="absolute top-4 left-4 w-16 h-12" />
            <h2 className="text-gray-700 mb-2 pt-9 pl-5">Kanyakumari District Cooperative Milk Producers Union Limited. Registration No.2946, Nagercoil"</h2>
          </div>
          {/* Box 1 */}
          <div
            ref={leftRef}
            className={`relative arrow-box overflow-hidden rounded-lg shadow-lg border-2 border-light-blue-500 bg-green-100 p-4 transition-transform duration-1000 delay-300 ease-in-out ${
                leftVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } scale-on-hover`}
            >
                <img
                src={arrowbox}
                alt="arrow box"
                className="absolute top-4 left-4 w-12 h-10"
                style={{ filter: 'invert(80%) sepia(20%) saturate(300%) hue-rotate(190deg) brightness(120%)' }} // Adjusted for light blue color
                />

            <h2 className="text-xl font-semibold mb-2 pt-8 pl-8">
            Union Organization. With date and year of Registration telephone, telegram and Fax number if any
            </h2>
            </div>  
          {/* Box 2 */}
          <div
            ref={leftRef}
            className={`relative arrow-box overflow-hidden rounded-lg shadow-lg border-2 border-light-blue-500 bg-blue-100 p-4 transition-transform duration-1200 delay-500 ease-in-out ${
              leftVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } scale-on-hover`}
          >
            <img src={dobule} 
            alt="Double Image" 
            className="absolute top-4 left-4 w-16 h-12"
            style={{ filter: 'invert(70%) sepia(10%) saturate(300%) hue-rotate(80deg) brightness(120%)' }} // More consistent light green color
            
            />
             <ul className="list-none text-gray-600 pt-10 pl-5 space-y-2">
             <li className="flex items-center">
                    <FaHandPointRight className="mr-2" />
                    Date of Registration: <span className='font-bold font-mono pl-2'>{aboutContent.UNION_ORGANIZATION_DETAILS.dateOfRegistration}</span>
                  </li>
                  <li className="flex items-center">
                    <FaHandPointRight className="mr-2" />
                    Phone No: <span className='font-bold font-mono pl-2'>{aboutContent.UNION_ORGANIZATION_DETAILS.phoneNo}</span>
                  </li>
                  <li className="flex items-center">
                    <FaHandPointRight className="mr-2" />
                    Fax No: <span className='font-bold font-mono pl-2'>{aboutContent.UNION_ORGANIZATION_DETAILS.faxNo}</span>
                  </li>
                  <li className="flex items-center">
                    <FaHandPointRight className="mr-2" />
                    Email: <span className='font-bold font-mono pl-2'>{aboutContent.UNION_ORGANIZATION_DETAILS.email}</span>
                  </li>
                  <li className="flex items-center">
                    <FaHandPointRight className="mr-2" />
                    Web: <span className='font-bold font-mono pl-2'>{aboutContent.UNION_ORGANIZATION_DETAILS.website}</span>
                  </li> 
            <br/>
          </ul>
          </div>
          {/* Box 1 */}
          <div
            className={`relative arrow-box overflow-hidden rounded-lg shadow-lg border-2 border-light-blue-500 bg-blue-100 p-4 transition-transform duration-1000 delay-300 ease-in-out ${
                leftVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } scale-on-hover`}
            >
            <img
                src={arrowbox}
                alt="arrow box"
                className="absolute top-4 left-4 w-12 h-10"
                style={{ filter: 'invert(80%) sepia(20%) saturate(300%) hue-rotate(80deg) brightness(120%)' }} // More consistent light green color
                />

            <h2 className="text-xl font-semibold mb-2 pt-8 pl-8">
            Nature of the Milk Federation / Union / Organization. (Co-operative or private Organization)
            </h2>
            </div>  
          {/* Box 2 */}
          <div

            className={`relative arrow-box overflow-hidden rounded-lg shadow-lg border-2 border-light-blue-500 bg-green-100 p-4 transition-transform duration-1200 delay-500 ease-in-out ${
              leftVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } scale-on-hover`}
          >
            <img src={dobule} alt="Double Image" className="absolute top-4 left-4 w-16 h-12" />
            <h2 className="text-gray-700 mb-2 pt-14 pl-7">Cooperative Union-Registered under Co-operative act 1983</h2>
          </div>
          {/* Box 1 */}
          <div

            className={`relative arrow-box overflow-hidden rounded-lg shadow-lg border-2 border-light-blue-500 bg-green-100 p-4 transition-transform duration-1000 delay-300 ease-in-out ${
                leftVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } scale-on-hover`}
            >
                <img
                src={arrowbox}
                alt="arrow box"
                className="absolute top-4 left-4 w-12 h-10"
                style={{ filter: 'invert(80%) sepia(20%) saturate(300%) hue-rotate(190deg) brightness(120%)' }} // Adjusted for light blue color
                />

            <h2 className="text-xl font-semibold mb-2 pt-8 pl-8">
            Registration No. under Co-operative Societies Act and FSSAI License 
            (copy of Registration Certificate to be enclosed)
            </h2>
            </div>  
          {/* Box 2 */}
          <div

            className={`relative arrow-box overflow-hidden rounded-lg shadow-lg border-2 border-light-blue-500 bg-blue-100 p-4 transition-transform duration-1200 delay-500 ease-in-out ${
              leftVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } scale-on-hover`}
          >
            <img src={dobule} 
            alt="Double Image" 
            className="absolute top-4 left-4 w-16 h-12"
            style={{ filter: 'invert(70%) sepia(10%) saturate(300%) hue-rotate(80deg) brightness(120%)' }} // More consistent light green color
            
            />
             <ul className="list-none text-gray-600 pt-12 pl-5 space-y-2">
             <li className="flex items-center">
              <FaHandPointRight className="mr-2" />
              Union Registration No: <span className='font-bold font-mono pl-2'>{aboutContent.UNION_ORGANIZATION_DETAILS.UnionregistrationNo}</span>
               </li>
               <li className="flex items-center">
              <FaHandPointRight className="mr-2" />
              FSSAI License No: <span className='font-bold font-mono pl-2'>{aboutContent.UNION_ORGANIZATION_DETAILS.FSSAILicenseNo}</span>
               </li>
               <li className="flex items-center">
              <FaHandPointRight className="mr-2" />
              Dated : <span className='font-bold font-mono pl-2'>{aboutContent.UNION_ORGANIZATION_DETAILS.Dated}</span>
               </li>
            </ul>
          </div>
          <div
            className={`relative arrow-box overflow-hidden rounded-lg shadow-lg border-2 border-light-blue-500 bg-blue-100 p-4 transition-transform duration-1000 delay-300 ease-in-out ${
                leftVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } scale-on-hover`}
            >
            <img
                src={arrowbox}
                alt="arrow box"
                className="absolute top-4 left-4 w-12 h-10"
                style={{ filter: 'invert(80%) sepia(20%) saturate(300%) hue-rotate(80deg) brightness(120%)' }} // More consistent light green color
                />

            <h2 className="text-xl font-semibold mb-2 pt-24 pl-6">
            Objectives of the co-operative /organization as per "by-law"
            </h2>
            </div>  
          {/* Box 2 */}
          <div
            className={`relative arrow-box overflow-hidden rounded-lg shadow-lg border-2 border-light-blue-500 bg-green-100 p-4 transition-transform t ${
              leftVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } scale-on-hover`}
          >
            <img src={dobule} alt="Double Image" className="absolute top-4 left-4 w-16 h-12" />
            <h2 className="text-gray-700 mb-2 pt-10 pl-6">To assure a standard price to the milk producers, eliminating middle man ,insist the importance of cooperativeness at the village level, 
                constructing a stable, steady and well organized marketing support, Distribution of quality milk and milk products at the reasonable price to the consumers.</h2>
          </div>
        </div>
      </div>

      {/* Right Side Images */}
      <div className="w-1/3 flex flex-col justify-center items-center space-y-5">
            {fetchedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`History ${index + 1}`}
                className={`w-full h-auto rounded-lg transition-opacity duration-1000 delay-${(index + 4) * 200} ease-in-out`}
              />
            ))}
          </div>
    </div>
    <div className="container mx-auto p-5 pl-36">
  <div className="flex flex-col gap-5">
    <div className="flex items-center space-x-10">
      {/* Board of Directors */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <img
            src={numplaceholder}
            alt="Board of Directors"
            className="w-44 h-44 transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-105"
            style={{ filter: "brightness(0.9)" }} /* Darken image slightly */
          />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
            {cadreBoard}
          </span>
        </div>
        <span className="font-bold mt-2 bg-gradient-to-r from-blue-200 to-green-200 rounded-full px-4 py-1">
          Board of Directors
        </span>
      </div>

      {/* Year of Establishment */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <img
            src={numplaceholder}
            alt="Year of Establishment"
            className="w-44 h-44 transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-105"
            style={{ filter: "brightness(0.9)" }} /* Darken image slightly */
          />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
            {cadreYear}
          </span>
        </div>
        <span className="font-bold mt-2 bg-gradient-to-r from-blue-200 to-green-200 rounded-full px-4 py-1">
          Year of Establishment
        </span>
      </div>

      {/* Total Cadre Strength */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <img
            src={numplaceholder}
            alt="Total Cadre Strength"
            className="w-44 h-44 transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-105"
            style={{ filter: "brightness(0.9)" }} /* Darken image slightly */
          />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
            {cadreStrength}
          </span>
        </div>
        <span className="font-bold mt-2 bg-gradient-to-r from-blue-200 to-green-200 rounded-full px-4 py-1">
          Total Cadre Strength
        </span>
      </div>

      {/* Number of Employees Working */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <img
            src={numplaceholder}
            alt="Number of Employees Working"
            className="w-44 h-44 transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-105"
            style={{ filter: "brightness(0.9)" }} /* Darken image slightly */
          />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
            {employees}
          </span>
        </div>
        <span className="font-bold mt-2 bg-gradient-to-r from-blue-200 to-green-200 rounded-full px-4 py-1">
          No of Employees Working
        </span>
      </div>
    </div>
  </div>
</div>

    </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Aboutpage;
