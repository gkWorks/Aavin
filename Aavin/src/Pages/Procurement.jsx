import React, { useState } from "react";
import {
  FaTractor,
  FaUsers,
  FaTruck,
  FaMapMarkedAlt,
  FaRoute,
  FaHorseHead,
  FaTint,
  FaRoad,
} from "react-icons/fa";
import Proimg from "../assets/Procurement/about.jpg";
import Route1 from "../assets/Procurement/1.jpg";
import Route3 from "../assets/Procurement/3.jpg";
import Route4 from "../assets/Procurement/4.jpg";
import YourImage1 from "../assets/Procurement/ai.jpg";
import YourImage2 from "../assets/Procurement/cf.jpg";
import YourImage4 from "../assets/Procurement/15.jpg";
import SchemeImage from "../assets/Procurement/scheme.jpg";
import { useLanguage } from '../TranslateBtn/LanguageContext'; // Import the context

const Procurement = () => {
  const { isRegional } = useLanguage();

  return (
    <div className="bg-gray-100 mt-52">
      {/* Image with heading */}
      <div className="relative">
        <img
          src={Proimg}
          alt="Procurement Background"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <h1 className="absolute inset-0 flex items-center justify-left pl-28 text-4xl font-bold text-white bg-black bg-opacity-50 rounded-lg">
          {isRegional ? "கொள்முதல்" : "PROCUREMENT"}
        </h1>
      </div>

      {/* Section for data */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeInUp">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          {isRegional
            ? "கொள்முதல் மற்றும் இடுபொருள் பிரிவு"
            : "PROCUREMENT & INPUT AND SCHEMES"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Data cards */}
          <div className="flex items-center bg-green-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaHorseHead className="text-3xl text-green-500 mr-4" />
            <p className="text-lg font-semibold">
              {isRegional
                ? "மொத்த கையாளல் திறன் - 30000"
                : "Total Handling Capacity - 30000"}
            </p>
          </div>
          <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaUsers className="text-3xl text-blue-500 mr-4" />
            <p className="text-lg font-semibold">
              {isRegional
                ? "செயல்படும் MPCS கள் - 57"
                : "No. of MPCS functioning - 57"}
            </p>
          </div>
          <div className="flex items-center bg-yellow-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaTint className="text-3xl text-yellow-500 mr-4" />
            <p className="text-lg font-semibold">
              {isRegional
                ? "முதலில் 57 MPCS கள் ஒப்பந்தத்தில் மின்வெளி அளிக்கின்றன"
                : "No. of MPCS supplying milk to Union - 57"}
            </p>
          </div>
          <div className="flex items-center bg-purple-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaUsers className="text-3xl text-purple-500 mr-4" />
            <p className="text-lg font-semibold">
              {isRegional
                ? "மொத்த உறுப்பினர்கள் - 20653"
                : "Total Members - 20653"}
            </p>
          </div>
          <div className="flex items-center bg-pink-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaUsers className="text-3xl text-pink-500 mr-4" />
            <p className="text-lg font-semibold">
              {isRegional
                ? "பெண்கள் உறுப்பினர்கள் - 6905"
                : "Women Members - 6905"}
            </p>
          </div>
          <div className="flex items-center bg-red-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaUsers className="text-3xl text-red-500 mr-4" />
            <p className="text-lg font-semibold">
              {isRegional
                ? "மின் உறுப்பினர்கள் - 3875"
                : "No. of Pouring Members - 3875"}
            </p>
          </div>
          <div className="flex items-center bg-teal-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaRoute className="text-3xl text-teal-500 mr-4" />
            <p className="text-lg font-semibold">
              {isRegional
                ? "மின் சேகரிப்பு பாதைகள் - 4"
                : "No. of Milk collection route - 4"}
            </p>
          </div>
          <div className="flex items-center bg-orange-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaMapMarkedAlt className="text-3xl text-orange-500 mr-4" />
            <p className="text-lg font-semibold">
              {isRegional
                ? "பொதி செய்யும் பாதைகள் - 9"
                : "No. of distribution route - 9"}
            </p>
          </div>
          <div className="flex items-center bg-indigo-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaTractor className="text-3xl text-indigo-500 mr-4" />
            <p className="text-lg font-semibold">
              {isRegional
                ? "மின் மருத்துவ பாதைகள் - 2"
                : "No. of Veterinary route - 2"}
            </p>
          </div>
          <div className="flex items-center bg-green-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <FaTruck className="text-3xl text-green-700 mr-4" />
            <p className="text-lg font-semibold">
              {isRegional
                ? "சராசரி பால் உற்பத்தி - 6000 Ltr"
                : "Average Milk Production - 6000 Ltr"}
            </p>
          </div>
        </div>
      </div>

      {/* Milk Procurement Route Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeInUp">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          {isRegional ? "பால் கொள்முதல் பாதை" : "Milk Procurement Route"}
        </h2>
        <p className="text-lg text-center text-gray-700 mb-8">
          {isRegional ? "பாதைகள்: 3" : "No. of Routes: 3"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ml-72">
          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <img
              src={Route1}
              alt="Kanyakumari"
              className="w-full h-40 object-cover brightness-200"
            />
            <p className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white py-2 font-semibold">
              {isRegional ? "கன்யாகுமரி" : "Kanyakumari"}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <img
              src={Route3}
              alt="Derisanamcope"
              className="w-full h-40 object-cover brightness-200"
            />
            <p className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white py-2 font-semibold">
              {isRegional ? "தெரிசனம்கோப்" : "Derisanamcope"}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <img
              src={Route4}
              alt="Manavalakurichi"
              className="w-full h-40 object-cover brightness-200"
            />
            <p className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white py-2 font-semibold">
              {isRegional ? "மணவாளக்குறிச்சி" : "Manavalakurichi"}
            </p>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeInUp">
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
          {isRegional ? "செயல்பாடுகள்" : "Activities"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center p-4 bg-yellow-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-2">
                {isRegional ? "செயற்கை அங்கவயிறு" : "Artificial Insemination"}
              </h3>
              <p className="text-gray-700">
                {isRegional
                  ? "கன்யாகுமரி மாவட்டத்தின் கிராமங்களில் பால்கொள்முதல் விருத்தி ‘செயற்கை அங்கவயிறு மற்றும் முதல்நேர்’ என்ற பயிற்சியின் மூலம் விருத்தி பெறுகிறது. "
                  : "The Milk Procurement in the villages of the Kanyakumari District is accelerated by conducting training programmes on various aspects among which ‘Artificial Insemination and First Aid’ is one of the best training given to the Employees of the MPCSs to carry out A.I work as “village level worker”. This A.I Technique being carried out at their doorsteps is more helpful to the producers. The calving rate is greatly increased over the years."}
              </p>
            </div>
            <img
              src={YourImage1}
              alt="Artificial Insemination"
              className="w-24 h-24 object-cover rounded-full ml-4"
            />
          </div>
          <div className="flex items-center p-4 bg-green-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-2">
                {isRegional
                  ? "மாடு உணவு மற்றும் கனிம கலவைகள்"
                  : "Cattle Feed and Mineral Mixture"}
              </h3>
              <p className="text-gray-700">
                {isRegional
                  ? "பால் தரத்தை மேம்படுத்தவும், உயிரினங்களின் உடல்நலத்தை பராமரிக்கவும், DCS உறுப்பினர்களுக்கு 50% சதவீத மானியம் வழங்கப்படும்."
                  : "With a view to improve the quality of milk and to maintain the health of animals, cattle feed supplied and mineral mixture supplied with 50% subsidy to the DCS members from union’s own fund."}
              </p>
            </div>
            <img
              src={YourImage2}
              alt="Cattle Feed"
              className="w-24 h-24 object-cover rounded-full ml-4"
            />
          </div>

          <div className="flex items-center p-4 bg-purple-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-2">
                {isRegional
                  ? "மாடு வாங்குதல் மற்றும் விற்பனை"
                  : "Cattle Purchase and Sale"}
              </h3>
              <p className="text-gray-700">
                {isRegional
                  ? "மாலிகையின் சிக்கல்களை அகற்றும் சிறந்த இடம் ஒவ்வொரு 15 நாளிலும் சமுகங்களுக்கு பணம் செலுத்தப்படுகிறது."
                  : "The milk cost payment is made to the societies for every 15 days without any delay."}
              </p>
            </div>
            <img
              src={YourImage4}
              alt="Cattle Purchase"
              className="w-24 h-24 object-cover rounded-full ml-4"
            />
          </div>
        </div>
      </div>

      {/* Schemes Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeInUp flex">
        <img
          src={SchemeImage}
          alt="Schemes"
          className="w-1/3 h-auto rounded-lg mr-4"
        />
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            {isRegional
              ? "திறன் மேம்பாட்டிற்கான பயிற்சி"
              : "Skill Development Training"}
          </h2>
          <p className="text-gray-700 mb-4">
            {isRegional
              ? "முதன்மை பால்கொள்முதல் கூட்டுறவு சங்கங்களின் உறுப்பினர்களுக்கு திறன் மேம்பாட்டிற்கான பயிற்சி வழங்கப்பட்டது."
              : "Skill Development Training was given to the members of the Primary Milk Producers Cooperative Societies with the financial assistance from the scheme fund."}
          </p>

          <h3 className="text-lg font-semibold">
            {isRegional
              ? "1. தேசிய மாடுகள் மிஷன் திட்டம்"
              : "1. National Livestock Mission Scheme"}
          </h3>
          <h4 className="text-md font-semibold">
            {isRegional
              ? "திறன் மேம்பாட்டிற்கான பயிற்சி"
              : "SKILL DEVELOPMENT TRAINING"}
          </h4>
          <p className="text-gray-700 mb-4">
            {isRegional
              ? "தேசிய மாடுகள் மிஷன் திட்டத்தின் கீழ் 250 உறுப்பினர்களுக்கான திறன் மேம்பாட்டிற்கான பயிற்சி செலவு ரூ.1.25 லட்சம்."
              : "Skill Development Training was conducted to 250 members of MPCS at the cost of Rs.1.25 lakhs under National Livestock Mission scheme."}
          </p>

          <h3 className="text-lg font-semibold">
            {isRegional
              ? "2. NADP மருத்துவ சேவை திட்டம்"
              : "2. NADP Veterinary service Scheme"}
          </h3>
          <h4 className="text-md font-semibold">
            {isRegional
              ? "இரு மொபைல் மருத்துவ சேவைகள்"
              : "Two mobile Veterinary routes Services"}
          </h4>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              {isRegional
                ? "நாகர்கோவிலில் I மையம்"
                : "Nagercoil I Head Quarter"}
            </li>
            <li>
              {isRegional
                ? "நாகர்கோவிலில் II மையம்"
                : "Nagercoil II Head Quarter"}
            </li>
          </ul>

          <h3 className="text-lg font-semibold">
            {isRegional ? "3. செயல்பாடுகள்:" : "3. Activities:"}
          </h3>
          <div className="mb-4">
            <h4 className="text-md font-semibold">
              {isRegional ? "மருத்துவ சேவைகள்" : "Veterinary Services"}
            </h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                {isRegional
                  ? "ஒவ்வொரு சங்கத்திற்கும் 2 சீருடை முகாம்கள்/வாரத்தில்"
                  : "Two regular camps per society/week"}
              </li>
              <li>
                {isRegional
                  ? "அசாதாரண சிக்கல்களை அழைப்பு அடிப்படையில் பார்வை செய்தல்"
                  : "Attending Emergency cases on call basis"}
              </li>
              <li>
                {isRegional
                  ? "சிறப்பு சுகாதார முகாம்கள் நடத்துதல்"
                  : "Conducting Special Health camps"}
              </li>
              <li>
                {isRegional
                  ? "MPCS இல் உள்ள திறனை உறுதி செய்யும் முகாம்கள்"
                  : "Fertility camps at MPCS besides ensuring supply of Cattle feed"}
              </li>
              <li>{isRegional ? "மினரல் கலவைகள்" : "Mineral Mixture"}</li>
              <li>
                {isRegional
                  ? "மூளையியல் தடுப்பு மருந்து வழங்குதல்"
                  : "FMD Vaccination in coordination with Animal Husbandry department"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Procurement;
