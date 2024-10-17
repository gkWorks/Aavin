import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  ChartPieIcon,
  HomeIcon,
  InformationCircleIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  PhotoIcon,
  TrophyIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const [isTendersOpen, setIsTendersOpen] = useState(false);
  
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsSectionsOpen(false);
        setIsTendersOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Functions to close dropdowns
  const closeSections = () => {
    setIsSectionsOpen(false);
  };
  const closeTenders = () => {
    setIsTendersOpen(false);
  };

  return (
    <div className="flex">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 shadow-md fixed top-0 z-30">
        <h1 className="text-center text-2xl font-bold">Dashboard</h1>
      </header>

      {/* Left Sidebar Navigation */}
      <nav
        className={`fixed top-16 left-0 h-full w-60 bg-gradient-to-b from-green-400 to-blue-500 text-white p-4 shadow-lg z-20 transition-opacity duration-700 transform ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      >
        <ul className="flex flex-col space-y-4">
          {/* Dashboard */}
          <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <ChartPieIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <Link
              to="/dashboard"
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Dashboard
            </Link>
          </li>
          {/* Dashboard Home */}
          <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <HomeIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <Link
              to="/dashboard/dhome"
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Home
            </Link>
          </li>

          {/* About Us */}
          <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <InformationCircleIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <Link
              to="/dashboard/about"
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              About Us
            </Link>
          </li>

          {/* Sections Dropdown */}
          <li className="relative flex items-center dropdown transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <ClipboardDocumentListIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <button
              onClick={() => setIsSectionsOpen(!isSectionsOpen)}
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Sections
            </button>
            {isSectionsOpen && (
              <ul className="absolute top-0 left-full bg-[#8BC34A] text-white rounded-md shadow-lg py-2 w-48">
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                  <Link to="/dashboard/procurement" onClick={closeSections}>
                    Procurement
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                  <Link to="/dashboard/dairy" onClick={closeSections}>
                    Dairy
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                  <Link to="/dashboard/marketing" onClick={closeSections}>
                    Marketing
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                  <Link to="/dashboard/accounts" onClick={closeSections}>
                    Accounts
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Products */}
          <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <ShoppingBagIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <Link
              to="/dashboard/products"
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Products
            </Link>
          </li>

          {/* Parlours */}
          <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <BuildingStorefrontIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <Link
              to="/dashboard/parlours"
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Parlours
            </Link>
          </li>

          {/* Gallery */}
          <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <PhotoIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <Link
              to="/dashboard/gallery"
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Gallery
            </Link>
          </li>

          {/* Achievements */}
          <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <TrophyIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <Link
              to="/dashboard/achievements"
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Achievements & Activities
            </Link>
          </li>

          {/* Contact */}
          <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <PhoneIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <Link
              to="/dashboard/contact"
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Contact
            </Link>
          </li>

          {/* Tenders & Forms Dropdown */}
          <li className="relative flex items-center dropdown transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <DocumentTextIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <button
              onClick={() => setIsTendersOpen(!isTendersOpen)}
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Tenders & Forms
            </button>
            {isTendersOpen && (
              <ul className="absolute top-0 left-full bg-[#8BC34A] text-white rounded-md shadow-lg py-2 w-48">
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                  <Link to="/dashboard/tenders" onClick={closeTenders}>
                    Tender
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-[#007ac5] transition duration-300">
                  <Link to="/dashboard/forms" onClick={closeTenders}>
                    Form
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Enquiry */}
          <li className="flex items-center transform transition-transform duration-300 hover:scale-110 hover:shadow-md">
            <QuestionMarkCircleIcon className="w-5 h-5 mr-2 hover:text-yellow-300 transition duration-300" />
            <Link
              to="/dashboard/enquiry"
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Enquiry
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="ml-60 p-4 mt-16 flex-grow">
        {location.pathname === "/dashboard" && (
          <h2 className="text-center text-xl font-bold mb-4">
            Welcome to the Dashboard!
          </h2>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
