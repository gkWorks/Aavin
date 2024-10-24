import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, InformationCircleIcon, ClipboardDocumentListIcon, ShoppingBagIcon, PhotoIcon, TrophyIcon, PhoneIcon, QuestionMarkCircleIcon, DocumentTextIcon, BuildingStorefrontIcon   } from '@heroicons/react/24/outline';
import { useLanguage } from '../TranslateBtn/LanguageContext';

const NavBar = () => {
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const [isTendersOpen, setIsTendersOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsSectionsOpen(false);
        setIsTendersOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Function to close the sections dropdown
  const closeSections = () => {
    setIsSectionsOpen(false);
  };

   // Function to close the tenders dropdown
   const closeTenders = () => {
    setIsTendersOpen(false);
  };

  const { isRegional } = useLanguage(); 

  return (
    <nav
      className={`sticky top-52 left-0 right-0 mx-auto bg-gradient-to-r from-blue-500 to-blue-500 text-white p-4 rounded-full shadow-2xl z-20 w-max transition-opacity duration-700 transform  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
    >
      <ul className="flex space-x-8 items-center">
        {/* Home */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
          <HomeIcon className="w-5 h-5  hover:text-yellow-300 transition duration-300" />
          <Link to="/" className="font-semibold hover:text-yellow-300 transition duration-300">{isRegional ? "முகப்பு" : "Home"}</Link>
        </li>

        {/* About Us */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
          <InformationCircleIcon className="w-5 h-5  hover:text-yellow-300 transition duration-300" />
          <a href="about" className="font-semibold hover:text-yellow-300 transition duration-300">{isRegional ? "எங்களை பற்றி" : "About Us"}</a>
        </li>

        {/* Sections with sub-navigation */}
        <li className="relative flex items-center dropdown  transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
          <ClipboardDocumentListIcon className="w-5 h-5  hover:text-yellow-300 transition duration-300" />
          <button onClick={() => setIsSectionsOpen(!isSectionsOpen)} className="font-semibold hover:text-yellow-300 transition duration-300">
            {isRegional ? "பிரிவுகள்" : "Sections"}
          </button>
          {isSectionsOpen && (
            <ul className="absolute top-10 left-0 bg-[#8BC34A] text-white rounded-md shadow-lg py-2 w-48">
              <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                <Link to="/procurement" onClick={closeSections}>
                {isRegional ? "கொள்முதல்" : "Procurement"}
                </Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                <Link to="/dairy" onClick={closeSections}>
                {isRegional ? "பால்" : "Dairy"}
                </Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                <Link to="/marketing" onClick={closeSections}>
                {isRegional ? "விநியோகம்" : "Marketing"}
                </Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                <Link to="/accounts" onClick={closeSections}>
                {isRegional ? "கணக்குகள்" : "Accounts"}
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Other navigation items */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
          <ShoppingBagIcon className="w-5 h-5  hover:text-yellow-300 transition duration-300" />
          <Link to="/products" className="font-semibold hover:text-yellow-300 transition duration-300">{isRegional ? "தயாரிப்பு" : "Products"}</Link>
        </li>
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
          <BuildingStorefrontIcon className="w-5 h-5  hover:text-yellow-300 transition duration-300" />
          <Link to="/parlours" className="font-semibold hover:text-yellow-300 transition duration-300">{isRegional ? "பார்லர்" : "Parlours"}</Link>
        </li>
        
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
          <PhotoIcon className="w-5 h-5  hover:text-yellow-300 transition duration-300" />
          <a href="gallery" className="font-semibold hover:text-yellow-300 transition duration-300">{isRegional ? "தொகுப்பு" : "Gallery"}</a>
        </li>

        <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
          <TrophyIcon className="w-5 h-5  hover:text-yellow-300 transition duration-300" />
          <a href="achievements" className="font-semibold hover:text-yellow-300 transition duration-300">{isRegional ? "சாதனைகள்" : "Achievements & Activities"}</a>
        </li>

        <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
          <PhoneIcon className="w-5 h-5  hover:text-yellow-300 transition duration-300" />
          <a href="#contact" className="font-semibold hover:text-yellow-300 transition duration-300">{isRegional ? "தொடர்பு" : "Contact"}</a>
        </li>

         {/* Tenders & Forms with sub-navigation */}
         <li className="relative flex items-center dropdown transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
          <DocumentTextIcon className="w-5 h-5  hover:text-yellow-300 transition duration-300" />
          <button onClick={() => setIsTendersOpen(!isTendersOpen)} className="font-semibold hover:text-yellow-300 transition duration-300">
          {isRegional ? "டெண்டர் & படிவம்" : "Tenders & Forms"}
          </button>
          {isTendersOpen && (
            <ul className="absolute top-10 left-0 bg-[#8BC34A] text-white rounded-md shadow-lg py-2 w-48">
              <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                <Link to="/tender" onClick={closeTenders}>
                {isRegional ? "டெண்டர்" : "Tender"}
                </Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                <Link to="/form" onClick={closeTenders}>
                {isRegional ? "படிவம்" : "Form"}
                </Link>
              </li>

            </ul>
          )}
        </li>

        <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
          <QuestionMarkCircleIcon className="w-5 h-5  hover:text-yellow-300 transition duration-300" />
          <Link to="/enquiry" className="font-semibold hover:text-yellow-300 transition duration-300">{isRegional ? "விசாரணை" : "Enquiry"}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
