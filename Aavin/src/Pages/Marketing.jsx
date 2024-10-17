import React from 'react';
import MarketingImage from '../assets/Procurement/about.jpg'; // Replace with your actual image path
import AavinOutletsImage from '../assets/Marketing/1.png'; // Replace with your actual Aavin outlets image path
import HeadOfficeImage from '../assets/Marketing/2.jpg'; // Replace with your actual image path
import UzhavarChanthaiImage from '../assets/Marketing/4.jpg'; // Replace with your actual image path
import UrbanHAATImage from '../assets/Marketing/1.png'; // Replace with your actual image path
import KuzhithuraiImage from '../assets/Marketing/2.png'; // Replace with your actual image path
import { FaArrowRight, FaStore } from 'react-icons/fa'; // Importing additional icon

const Marketing = () => {
  return (
    <div className='mt-52'>
      {/* Header Section with Background Image */}
      <div className="relative">
        <img 
          src={MarketingImage} 
          alt="Procurement Background" 
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <h1 className="absolute inset-0 flex items-center justify-left pl-28 text-4xl font-bold text-white bg-black bg-opacity-50 rounded-lg">MARKETING</h1>
      </div>

      {/* Marketing Section Container */}
      <div className="bg-green-50 p-8 rounded-lg shadow-lg mx-4 mt-8 mb-8 animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Marketing Section</h2>

        {/* Points with Icons */}
        <div className="flex items-start mb-4">
          <FaArrowRight className="text-blue-600 mr-2 mt-1 transition-transform duration-300 transform hover:scale-125 hover:text-blue-800" />
          <p className="text-lg text-gray-700 mb-4 transition duration-300 hover:text-blue-500">
            Promoting and selling products & services through the brand name AAVIN to its valued customer.
          </p>
        </div>

        <div className="flex items-start mb-4">
          <FaArrowRight className="text-blue-600 mr-2 mt-1 transition-transform duration-300 transform hover:scale-125 hover:text-blue-800" />
          <p className="text-lg text-gray-700 mb-4 transition duration-300 hover:text-blue-500">
            Aavin is one of the popular Co-operative Milk Producers' Federations in India which offers committed supply of milk and milk products to the consumers through Union Parlours, Booths, FRO’s, and other retail outlets.
          </p>
        </div>

        <div className="flex items-start mb-4">
          <FaArrowRight className="text-blue-600 mr-2 mt-1 transition-transform duration-300 transform hover:scale-125 hover:text-blue-800" />
          <p className="text-lg text-gray-700 mb-4 transition duration-300 hover:text-blue-500">
            Making sure all the people in the district to have a healthy & hygienic life by consuming pure, fresh, and healthy milk and milk products.
          </p>
        </div>

        <div className="flex items-start">
          <FaArrowRight className="text-blue-600 mr-2 mt-1 transition-transform duration-300 transform hover:scale-125 hover:text-blue-800" />
          <p className="text-lg text-gray-700 mb-4 transition duration-300 hover:text-blue-500">
            Applies its marketing strategy by throughly understanding the consumer’s needs and their purchasing behaviour.
          </p>
        </div>
      </div>

      {/* Aavin Outlets Section */}
      <div className="flex justify-center bg-white p-8 rounded-lg shadow-lg mx-4 mt-8 mb-8 animate__animated animate__fadeIn">
        <div className="flex items-start space-x-8 w-full max-w-4xl">
          {/* Left Side Data */}
          <div className="flex flex-col justify-start space-y-6 pr-8 ">
            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200 hover:shadow-2xl hover:scale-105" style={{ width: '400px' }}>
              <img src={HeadOfficeImage} alt="Head Office" className="w-24 h-24 object-cover rounded-full shadow-md brightness-200" />
              <div>
                <h3 className="text-lg font-semibold">Head Office</h3>
                <p className="text-gray-700">Rs 7.66 Lakhs</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200 hover:shadow-2xl hover:scale-105" style={{ width: '400px' }}>
              <img src={UzhavarChanthaiImage} alt="Uzhavar Chanthai" className="w-24 h-24 object-cover rounded-full shadow-md brightness-200" />
              <div>
                <h3 className="text-lg font-semibold">Uzhavar Chanthai</h3>
                <p className="text-gray-700">Rs 20.10 Lakhs</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200 hover:shadow-2xl hover:scale-105" style={{ width: '400px' }}>
              <img src={UrbanHAATImage} alt="Urban HAAT" className="w-24 h-24 object-cover rounded-full shadow-md" />
              <div>
                <h3 className="text-lg font-semibold">Urban HAAT</h3>
                <p className="text-gray-700">Rs 36.90 Lakhs</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200 hover:shadow-2xl hover:scale-105" style={{ width: '400px' }}>
              <img src={KuzhithuraiImage} alt="Kuzhithurai" className="w-24 h-24 object-cover rounded-full shadow-md" />
              <div>
                <h3 className="text-lg font-semibold">Kuzhithurai</h3>
                <p className="text-gray-700">Rs 6.32 Lakhs</p>
              </div>
            </div>
          </div>

          <div className="flex-1" style={{ maxWidth: '400px' }}>
            <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Aavin Outlets at Kanyakumari District</h2>
            <img 
              src={AavinOutletsImage} 
              alt="Aavin Outlets" 
              className="w-full h-80 object-cover rounded-lg shadow-md" 
            />
          </div>
        </div>
      </div>

       {/* Parlour and Sales Route Section */}
<div className="flex justify-center mx-4 mt-8 mb-8 animate__animated animate__fadeIn">
  {/* Parlour Section */}
  <div className="flex flex-col items-start w-full max-w-md p-4 bg-blue-50 rounded-lg shadow-lg mr-4"> {/* Changed to max-w-md */}
    <h2 className="text-2xl font-bold text-blue-600 mb-4">Parlour</h2>
    {[ 
      "01 Head Office Hi-Tech Parlour",
      "02 Collectorate Parlour",
      "03 SETC Parlour",
      "04 Anna Bus Stand Parlour",
      "05 Railway Parlour",
      "06 Uzhavar Chanthai Hi-Tech Parlour",
    ].map((parlour, index) => (
      <div key={index} className="flex items-center space-x-2 p-3 bg-green-100 rounded-lg shadow-md hover:bg-green-200 transition duration-300 transform hover:scale-105 mb-2"> {/* Added mb-2 */}
        <span className="text-blue-600 font-bold">{parlour.split(" ")[0]}</span>
        <span className="text-green-700 font-medium">{parlour.split(" ").slice(1).join(" ")}</span>
      </div>
    ))}
  </div>

  {/* Sales Route Section */}
  <div className="flex flex-col items-start w-full max-w-md p-4 bg-yellow-50 rounded-lg shadow-lg"> {/* Changed to max-w-md */}
    <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Aavin Milk and Products Sales Route</h2>
    <div className="flex flex-wrap items-center space-x-2">
      {[ 
        "Boothapandy",
        "Kadayal",
        "Kaliyakkavilai",
        "Kanyakumari",
        "Manavalakurichi",
        "Nagercoil Town I",
        "Nagercoil Town II",
        "Nagercoil Town III",
      ].map((location, index) => (
        <React.Fragment key={index}>
          <div className="p-2 bg-green-200 rounded-lg shadow-md hover:bg-green-300 transition duration-300 transform hover:scale-105 flex items-center mb-2"> {/* Added mb-2 */}
            <span className="text-blue-500 font-bold">{location}</span>
            <FaArrowRight className="text-red-400 ml-1" />
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
</div>

    </div>
  );
};

export default Marketing;
