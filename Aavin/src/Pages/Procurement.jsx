import React from 'react';
import { FaTractor, FaUsers, FaTruck, FaMapMarkedAlt, FaRoute, FaHorseHead, FaTint, FaRoad } from 'react-icons/fa';
import Proimg from '../assets/Procurement/about.jpg'; 
import Route1 from '../assets/Procurement/1.jpg'
import Route3 from '../assets/Procurement/3.jpg';
import Route4 from '../assets/Procurement/4.jpg';
import YourImage1 from '../assets/Procurement/ai.jpg';
import YourImage2 from '../assets/Procurement/cf.jpg';
import YourImage4 from '../assets/Procurement/15.jpg';
import SchemeImage from '../assets/Procurement/scheme.jpg'; 

const Procurement = () => {
  return (
    <div className="bg-gray-100 mt-52">
      {/* Image with heading */}
      <div className="relative ">
        <img 
          src={Proimg} 
          alt="Procurement Background" 
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <h1 className="absolute inset-0 flex items-center justify-left pl-28 text-4xl font-bold text-white bg-black bg-opacity-50 rounded-lg">PROCUREMENT</h1>
      </div>

      {/* Section for data */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeInUp">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">PROCUREMENT & INPUT AND SCHEMES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Data cards */}
          <div className="flex items-center bg-green-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaHorseHead className="text-3xl text-green-500 mr-4" />
            <p className="text-lg font-semibold">Total Handling Capacity - 30000</p>
          </div>
          <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaUsers className="text-3xl text-blue-500 mr-4" />
            <p className="text-lg font-semibold">No. of MPCS functioning - 53</p>
          </div>
          <div className="flex items-center bg-yellow-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaTint className="text-3xl text-yellow-500 mr-4" />
            <p className="text-lg font-semibold">No. of MPCS supplying milk to Union - 40</p>
          </div>
          <div className="flex items-center bg-purple-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaUsers className="text-3xl text-purple-500 mr-4" />
            <p className="text-lg font-semibold">Total Members - 20545</p>
          </div>
          <div className="flex items-center bg-pink-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaUsers className="text-3xl text-pink-500 mr-4" />
            <p className="text-lg font-semibold">Women Members - 6868</p>
          </div>
          <div className="flex items-center bg-red-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaUsers className="text-3xl text-red-500 mr-4" />
            <p className="text-lg font-semibold">No. of Pouring Members - 3875</p>
          </div>
          <div className="flex items-center bg-teal-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaRoute className="text-3xl text-teal-500 mr-4" />
            <p className="text-lg font-semibold">No. of Milk collection route - 4</p>
          </div>
          <div className="flex items-center bg-orange-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaMapMarkedAlt className="text-3xl text-orange-500 mr-4" />
            <p className="text-lg font-semibold">No. of distribution route - 9</p>
          </div>
          <div className="flex items-center bg-indigo-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaTractor className="text-3xl text-indigo-500 mr-4" />
            <p className="text-lg font-semibold">No. of Veterinary route - 2</p>
          </div>
          <div className="flex items-center bg-green-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaTruck className="text-3xl text-green-700 mr-4" />
            <p className="text-lg font-semibold">Average Milk Production - 6000 Ltr</p>
          </div>
        </div>
      </div>

      {/* Milk Procurement Route Section */}
      <div className="mt-8 p-6 bg-white rounded-lg  shadow-lg animate__animated animate__fadeInUp">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Milk Procurement Route</h2>
        <p className="text-lg text-center text-gray-700 mb-8">No. of Routes: 3</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ml-72">
          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <img src={Route1} alt="Kanyakumari" className="w-full h-40 object-cover brightness-200"/>
            <p className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white py-2 font-semibold">Kanyakumari</p>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <img src={Route3} alt="Derisanamcope" className="w-full h-40 object-cover brightness-200"/>
            <p className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white py-2 font-semibold">Derisanamcope</p>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <img src={Route4} alt="Manavalakurichi" className="w-full h-40 object-cover brightness-200"/>
            <p className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white py-2 font-semibold">Manavalakurichi</p>
          </div>
        </div>
      </div>

      {/* Activities Section */}
<div className="mt-8 p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeInUp">
  <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">Activities</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="flex items-center p-4 bg-yellow-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">Artificial Insemination</h3>
        <p className="text-gray-700">
        The Milk Procurement in the villages of the Kanyakumari District is accelerated by conducting training programmes on various aspects among which ‘Artificial Insemination and First Aid’ is one of the best training given to the Employees of the MPCSs to carry out A.I work as “village level worker” .This A.I Technique being carried out at their doorsteps is more helpful to the producers. The calving rate is greatly increased over the years.
        </p>
      </div>
      <img src={YourImage1} alt="Artificial Insemination" className="w-24 h-24 object-cover rounded-full ml-4" />
    </div>
    <div className="flex items-center p-4 bg-green-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">Cattle Feed and Mineral Mixture</h3>
        <p className="text-gray-700">
        With a view to improve the quality of milk and to maintain the health of animals, cattle feed supplied and mineral mixture supplied with 50% subsidy to the DCS members from union’s own fund.
        </p>
      </div>
      <img src={YourImage2} alt="Cattle Feed" className="w-24 h-24 object-cover rounded-full ml-4" />
    </div>
    
    <div className="flex items-center p-4 bg-purple-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">Cattle Purchase and Sale</h3>
        <p className="text-gray-700">
        The milk cost payment is made to the societies for every 15 days without any delay.
        </p>
      </div>
      <img src={YourImage4} alt="Cattle Purchase" className="w-24 h-24 object-cover rounded-full ml-4" />
    </div>
  </div>
</div>

{/* Schemes Section */}
<div className="mt-8 p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeInUp flex">
        <img src={SchemeImage} alt="Schemes" className="w-1/3 h-auto rounded-lg mr-4" />
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Skill Development Training</h2>
          <p className="text-gray-700 mb-4">
            Skill Development Training was given to the members of the Primary Milk Producers Cooperative Societies with the financial assistance from the scheme fund.
          </p>
          
          <h3 className="text-lg font-semibold">1. National Livestock Mission Scheme</h3>
          <h4 className="text-md font-semibold">SKILL DEVELOPMENT TRAINING</h4>
          <p className="text-gray-700 mb-4">
            Skill Development Training was conducted to 250 members of MPCS at the cost of Rs.1.25 lakhs under National Livestock Mission scheme.
          </p>

          <h3 className="text-lg font-semibold">2. NADP Veterinary service Scheme</h3>
          <h4 className="text-md font-semibold">Two mobile Veterinary routes Services</h4>
          <ul className="list-disc list-inside text-gray-700">
          <li>Nagercoil I Head Quarter</li>
          <li>Nagercoil II Head Quarter</li>
          </ul>

          <h3 className="text-lg font-semibold">3. Activities:</h3>
          <div className="mb-4">
  <h4 className="text-md font-semibold">Veterinary Services</h4>
  <ul className="list-disc list-inside text-gray-700">
    <li>Two regular camps per society/week</li>
    <li>Attending Emergency cases on call basis</li>
    <li>Conducting Special Health camps</li>
    <li>Fertility camps at MPCS besides ensuring supply of Cattle feed</li>
    <li>Mineral Mixture</li>
    <li>FMD Vaccination in coordination with Animal Husbandry department</li>
  </ul>
</div>
        </div>
      </div>

    </div>
  );
};

export default Procurement;
