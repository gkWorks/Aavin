import React, { useState } from 'react';
import { HomeIcon, InformationCircleIcon, ClipboardDocumentListIcon, ShoppingBagIcon, PhotoIcon, TrophyIcon, PhoneIcon, QuestionMarkCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const NavBar = () => {
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);

  return (
    <nav className="top-48 left-0 right-0 mx-auto w-max bg-[#8BC34A] text-white p-4 rounded-full shadow-lg z-10">
      <ul className="flex space-x-8 items-center">
        {/* Home */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110">
          <HomeIcon className="w-5 h-5 mr-2 hover:text-blue-500 transition duration-300" />
          <a href="#home" className="font-semibold hover:text-blue-500 transition duration-300">Home</a>
        </li>

        {/* About Us */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110">
          <InformationCircleIcon className="w-5 h-5 mr-2 hover:text-blue-500 transition duration-300" />
          <a href="#about" className="font-semibold hover:text-blue-500 transition duration-300">About Us</a>
        </li>

        {/* Sections with sub-navigation */}
        <li className="relative flex items-center transform transition-transform duration-300 hover:scale-110">
          <ClipboardDocumentListIcon className="w-5 h-5 mr-2 hover:text-blue-500 transition duration-300" />
          <button onClick={() => setIsSectionsOpen(!isSectionsOpen)} className="font-semibold hover:text-blue-500 transition duration-300">
            Sections
          </button>
          {isSectionsOpen && (
            <ul className="absolute top-10 left-0 bg-[#8BC34A] text-white rounded-md shadow-lg py-2">
              <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300"><a href="#procurement">Procurement</a></li>
              <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300"><a href="#dairy">Dairy</a></li>
              <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300"><a href="#marketing">Marketing</a></li>
              <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300"><a href="#accounts">Accounts</a></li>
            </ul>
          )}
        </li>

        {/* Products Parlours */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110">
          <ShoppingBagIcon className="w-5 h-5 mr-2 hover:text-blue-500 transition duration-300" />
          <a href="#products" className="font-semibold hover:text-blue-500 transition duration-300">Products Parlours</a>
        </li>

        {/* Gallery */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110">
          <PhotoIcon className="w-5 h-5 mr-2 hover:text-blue-500 transition duration-300" />
          <a href="#gallery" className="font-semibold hover:text-blue-500 transition duration-300">Gallery</a>
        </li>

        {/* Achievements & Activities */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110">
          <TrophyIcon className="w-5 h-5 mr-2 hover:text-blue-500 transition duration-300" />
          <a href="#achievements" className="font-semibold hover:text-blue-500 transition duration-300">Achievements & Activities</a>
        </li>

        {/* Contact */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110">
          <PhoneIcon className="w-5 h-5 mr-2 hover:text-blue-500 transition duration-300" />
          <a href="#contact" className="font-semibold hover:text-blue-500 transition duration-300">Contact</a>
        </li>

        {/* Forms */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110">
          <DocumentTextIcon className="w-5 h-5 mr-2 hover:text-blue-500 transition duration-300" />
          <a href="#forms" className="font-semibold hover:text-blue-500 transition duration-300">Forms</a>
        </li>

        {/* Enquiry */}
        <li className="flex items-center transform transition-transform duration-300 hover:scale-110">
          <QuestionMarkCircleIcon className="w-5 h-5 mr-2 hover:text-blue-500 transition duration-300" />
          <a href="#enquiry" className="font-semibold hover:text-blue-500 transition duration-300">Enquiry</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
