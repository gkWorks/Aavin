import React, { useEffect, useState } from 'react';
import logo from '../assets/logo/logo-a.png';
import stalin from '../assets/Header/cm_stalin.jpeg';
import rajakannappan from '../assets/Header/minister_rajakannappan.jpg';
import { useLanguage } from '../TranslateBtn/LanguageContext';

const Header = () => {
  const [visible, setVisible] = useState(false);
  const { isRegional, toggleLanguage } = useLanguage();
  const [headerText, setHeaderText] = useState({
    title: 'Aavin Milk Even Better than Gold',
    cmName: "Thiru MK Stalin",
    cmPosition: "Hon'ble Chief Minister of Tamil Nadu",
    ministerName: "Thiru RS Rajakannappan",
    ministerPosition: "Hon'ble Minister for Milk & Dairy Development",
    companyname: "The Kanyakumari District Co-operative Milk Producers Union Ltd"
  }); // State for header content


  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  

  useEffect(() => {
    setHeaderText(isRegional ? {
      title: 'ஆவின் பால் தங்கத்திற்கும் மேல்',
      cmName: "திரு எம் கே ஸ்டாலின்",
      cmPosition: "மாண்புமிகு தமிழக முதல்வர்",
      ministerName: "திரு ஆர்எஸ் ராஜக்கண்ணப்பன்",
      ministerPosition: "மாண்புமிகு பால்வள மேம்பாட்டு அமைச்சர்",
      companyname: "கன்னியாகுமரி மாவட்ட பால் உற்பத்தியாளர்கள் யூனியன்"
    } : {
      title: 'Aavin Milk Even Better than Gold',
      cmName: "Thiru MK Stalin",
      cmPosition: "Hon'ble Chief Minister of Tamil Nadu",
      ministerName: "Thiru RS Rajakannappan",
      ministerPosition: "Hon'ble Minister for Milk & Dairy Development",
      companyname: "The Kanyakumari District Co-operative Milk Producers Union Ltd"
    });
  }, [isRegional]);

  return (
    <>
      {/* Top Header with Aavin Milk slogan */}
      <header
        className={`fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 shadow-lg z-30 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold text-center">
            {headerText.title} {/* Display dynamic header title */}
          </h1>
          {/* Language Toggle Button */}
          <button 
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300"
            onClick={toggleLanguage} // Call the toggle function
          >
            {isRegional ? 'English' : 'தமிழ்'} {/* Toggle button text */}
          </button>
        </div>
      </header>

      {/* Company Logo and Name with Profile Pictures */}
      <section
        className={`fixed mt-10 left-0 w-full bg-white text-[#007ac5] p-6 z-20 transition-transform duration-700 ${visible ? 'translate-y-0' : '-translate-y-10 opacity-0'}`}
      >
        <div className="container mx-auto flex items-center justify-between space-x-4">
          {/* Left Profile Picture */}
          <div className="flex flex-col items-center">
            <img
              src={stalin}
              alt="Thiru MK Stalin"
              className="w-24 h-24 rounded-full"
            />
            <p className="text-center text-sm font-semibold mt-2">
              {headerText.cmName}<br />
              {headerText.cmPosition} {/* Display dynamic CM position */}
            </p>
          </div>

          {/* Company Logo and Name */}
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="Company Logo"
              className="mr-4"
              style={{ width: '170px', height: 'auto' }}
            />
            <h2 className="text-2xl font-semibold text-center ">
              {headerText.companyname}
            </h2>
          </div>

          {/* Right Profile Picture */}
          <div className="flex flex-col items-center">
            <img
              src={rajakannappan}
              alt="Thiru RS Rajakannappan"
              className="w-24 h-24 rounded-full"
            />
            <p className="text-center text-sm font-semibold mt-2">
              {headerText.ministerName}<br />
              {headerText.ministerPosition} {/* Display dynamic minister position */}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
