import React from 'react';
import MarketingImage from '../assets/Procurement/about.jpg'; // Replace with your actual image path
import AavinOutletsImage from '../assets/Marketing/1.png'; // Replace with your actual Aavin outlets image path
import HeadOfficeImage from '../assets/Marketing/2.jpg'; // Replace with your actual image path
import UzhavarChanthaiImage from '../assets/Marketing/4.jpg'; // Replace with your actual image path
import UrbanHAATImage from '../assets/Marketing/1.png'; // Replace with your actual image path
import KuzhithuraiImage from '../assets/Marketing/2.png'; // Replace with your actual image path
import { FaArrowRight, FaStore } from 'react-icons/fa'; // Importing additional icon
import { useLanguage } from '../TranslateBtn/LanguageContext';

const Marketing = () => {
  const { isRegional } = useLanguage();

  return (
    <div className='mt-52'>
     

       {/* Header Section with Background Image */}
       <div className="relative mt-4">
        <img 
          src={MarketingImage} 
          alt={isRegional ? "பரிசீலனை பின்னணி" : "Procurement Background"} 
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <h1 className="absolute inset-0 flex items-center justify-left pl-28 text-4xl font-bold text-white bg-black bg-opacity-50 rounded-lg">
          {isRegional ? "விநியோகம்" : "MARKETING"}
        </h1>
      </div>

       {/* Marketing Section Container */}
      <div className="bg-green-50 p-8 rounded-lg shadow-lg mx-4 mt-8 mb-8 animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">{isRegional ? "விநியோகம் பகுதி" : "Marketing Section"}</h2>

        {/* Points with Icons */}
        <div className="flex items-start mb-4">
          <FaArrowRight className="text-blue-600 mr-2 mt-1 transition-transform duration-300 transform hover:scale-125 hover:text-blue-800" />
          <p className="text-lg text-gray-700 mb-4 transition duration-300 hover:text-blue-500">
            {isRegional
              ? "மதிப்பிற்குரிய வாடிக்கையாளர்களுக்கு ஆவின் என்ற பிராண்ட் பெயர் மூலம் தயாரிப்புகள் மற்றும் சேவைகளை விளம்பரம் செய்து விற்கிறது."
              : "Promoting and selling products & services through the brand name AAVIN to its valued customer."}
          </p>
        </div>

        <div className="flex items-start mb-4">
          <FaArrowRight className="text-blue-600 mr-2 mt-1 transition-transform duration-300 transform hover:scale-125 hover:text-blue-800" />
          <p className="text-lg text-gray-700 mb-4 transition duration-300 hover:text-blue-500">
            {isRegional
              ? "ஆவின் இந்தியாவில் பிரபலமான கூட்டுறவு பால்பொருட்கள் உற்பத்தியாளர்கள் கூட்டமைப்புகளில் ஒன்றாகும், இது ஒன்றியம் பார்லர்களின் மூலம் மற்றும் பிற சில்லறை வெளியீடுகளின் மூலம் வாடிக்கையாளர்களுக்கு பாலும் பால்பொருட்களும் வழங்குகிறது."
              : "Aavin is one of the popular Co-operative Milk Producers' Federations in India which offers committed supply of milk and milk products to the consumers through Union Parlours, Booths, FRO’s, and other retail outlets."}
          </p>
        </div>

        <div className="flex items-start mb-4">
          <FaArrowRight className="text-blue-600 mr-2 mt-1 transition-transform duration-300 transform hover:scale-125 hover:text-blue-800" />
          <p className="text-lg text-gray-700 mb-4 transition duration-300 hover:text-blue-500">
            {isRegional
              ? "மாவட்டத்தில் உள்ள அனைவரும் தூய, புதிய மற்றும் ஆரோக்கியமான பாலும் பால்பொருட்களும் சாப்பிடுவதன் மூலம் ஆரோக்கியமாகவும் சுகாதாரமாகவும் வாழ வேண்டும் என்பதற்கான உறுதி."
              : "Making sure all the people in the district to have a healthy & hygienic life by consuming pure, fresh, and healthy milk and milk products."}
          </p>
        </div>

        <div className="flex items-start">
          <FaArrowRight className="text-blue-600 mr-2 mt-1 transition-transform duration-300 transform hover:scale-125 hover:text-blue-800" />
          <p className="text-lg text-gray-700 mb-4 transition duration-300 hover:text-blue-500">
            {isRegional
              ? "வாங்கும் ஆவணங்கள் மற்றும் அவர்களின் வாங்கும் நடத்தை என்பதை முழுமையாக புரிந்து கொண்டு தங்கள் மார்க்கெட்டிங் உத்திகளை செயல்படுத்துகிறது."
              : "Applies its marketing strategy by thoroughly understanding the consumer’s needs and their purchasing behaviour."}
          </p>
        </div>
      </div>

       {/* Aavin Outlets Section */}
      <div className="flex justify-center bg-white p-8 rounded-lg shadow-lg mx-4 mt-8 mb-8 animate__animated animate__fadeIn">
        <div className="flex items-start space-x-8 w-full max-w-4xl">

          {/* Left Side Data */}
          <div className="flex flex-col justify-start space-y-6 pr-8">
            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200 hover:shadow-2xl hover:scale-105" style={{ width: '400px' }}>
              <img src={HeadOfficeImage} alt={isRegional ? "முகாமை அலுவலகம்" : "Head Office"} className="w-24 h-24 object-cover rounded-full shadow-md brightness-200" />
              <div>
                <h3 className="text-lg font-semibold">{isRegional ? "முகாமை அலுவலகம்" : "Head Office"}</h3>
                <p className="text-gray-700">{isRegional ? "ரூ 7.66 லட்சம்" : "Rs 7.66 Lakhs"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200 hover:shadow-2xl hover:scale-105" style={{ width: '400px' }}>
              <img src={UzhavarChanthaiImage} alt={isRegional ? "உழவர் சாந்தை" : "Uzhavar Chanthai"} className="w-24 h-24 object-cover rounded-full shadow-md brightness-200" />
              <div>
                <h3 className="text-lg font-semibold">{isRegional ? "உழவர் சாந்தை" : "Uzhavar Chanthai"}</h3>
                <p className="text-gray-700">{isRegional ? "ரூ 20.10 லட்சம்" : "Rs 20.10 Lakhs"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200 hover:shadow-2xl hover:scale-105" style={{ width: '400px' }}>
              <img src={UrbanHAATImage} alt={isRegional ? "நகர்ப்புற HAAT" : "Urban HAAT"} className="w-24 h-24 object-cover rounded-full shadow-md brightness-100" />
              <div>
                <h3 className="text-lg font-semibold">{isRegional ? "நகர்ப்புற HAAT" : "Urban HAAT"}</h3>
                <p className="text-gray-700">{isRegional ? "ரூ 36.90 லட்சம்" : "Rs 36.90 Lakhs"}</p>
              </div>

            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200 hover:shadow-2xl hover:scale-105" style={{ width: '400px' }}>
              <img src={KuzhithuraiImage} alt={isRegional ? "குழித்துறை" : "Kuzhithurai"} className="w-24 h-24 object-cover rounded-full shadow-md brightness-100" />
              <div>
                <h3 className="text-lg font-semibold">{isRegional ? "குழித்துறை" : "Kuzhithurai"}</h3>
                <p className="text-gray-700">{isRegional ? "ரூ 6.32 லட்சம்" : "Rs 6.32 Lakhs"}</p>
              </div>
            </div>
            {/* Add other similar cards here */}
          </div>
          {/* Right Side Image */}
          <div className="flex-1" style={{ maxWidth: '400px' }}>
            <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
              {isRegional ? "கன்னியாகுமரி மாவட்டத்தில் Aavin வெளியீடுகள்" : "Aavin Outlets at Kanyakumari District"}
            </h2>
            <img src={AavinOutletsImage} alt={isRegional ? "Aavin வெளியீடுகள்" : "Aavin Outlets"} className="w-full h-80 object-cover rounded-lg shadow-md" />
          </div>
        </div>
      </div>

        {/* Parlour and Sales Route Section */}
      <div className="flex justify-center mx-4 mt-8 mb-8 animate__animated animate__fadeIn">
        {/* Parlour Section */}
        <div className="flex flex-col items-start w-full max-w-md p-4 bg-blue-50 rounded-lg shadow-lg mr-4"> {/* Changed to max-w-md */}
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            {isRegional ? "பார்லர்" : "Parlour"}
          </h2>
          {[
            isRegional ? "தலைமை அலுவலக உயர் தொழில்நுட்ப பார்லர்" : "Head Office Hi-Tech Parlour",
            isRegional ? "சேகரிப்பாளர் அலுவலக பார்லர்" : "Collectorate Parlour",
            isRegional ? "SETC பார்லர்" : "SETC Parlour",
            isRegional ? "அண்ணா பேருந்து நிலைய பார்லர்" : "Anna Bus Stand Parlour",
            isRegional ? "ரயில்வே பார்லர்" : "Railway Parlour",
            isRegional ? "உழவர் சந்தை உயர் தொழில்நுட்ப பார்லர்" : "Uzhavar Chanthai Hi-Tech Parlour",
          ].map((parlour, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-green-100 rounded-lg shadow-md hover:bg-green-200 transition duration-300 transform hover:scale-105 mb-2"> {/* Added mb-2 */}
              <span className="text-blue-600 font-bold"><FaStore/></span>
              <span className="text-green-700 font-medium">{parlour}</span>
            </div>
          ))}
        </div>

        {/* Sales Route Section */}
        <div className="flex flex-col items-start w-full max-w-md p-4 bg-yellow-50 rounded-lg shadow-lg"> {/* Changed to max-w-md */}
          <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
            {isRegional ? "ஆவின் பால் மற்றும் பொருட்கள் விற்பனை பாதை" : "Aavin Milk and Products Sales Route"}
          </h2>
          <div className="flex flex-wrap items-center space-x-2">
            {[
              isRegional ? "பூதப்பாண்டி" : "Boothapandy",
              isRegional ? "கடையால்" : "Kadayal",
              isRegional ? "காளியக்காவிளை" : "Kaliyakkavilai",
              isRegional ? "கன்னியாகுமரி" : "Kanyakumari",
              isRegional ? "மணவாளக்குறிச்சி" : "Manavalakurichi",
              isRegional ? "நாகர்கோவில் டவுன் I" : "Nagercoil Town I",
              isRegional ? "நாகர்கோவில் டவுன் II" : "Nagercoil Town II",
              isRegional ? "நாகர்கோவில் டவுன் III" : "Nagercoil Town III",
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
