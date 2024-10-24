// Dairy.jsx
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image1 from '../assets/Dairy/616K5njRGfL.jpg';
import Image2 from '../assets/Dairy/75137807_144938300244012_7355363663152152576_n.jpg';
import Image3 from '../assets/Dairy/75636121_146164043454771_8953216373438283776_n.jpg';
import Image4 from '../assets/Dairy/74698853_146622713408904_9111728605422944256_n.jpg';
import { useLanguage } from '../TranslateBtn/LanguageContext'; // Import the context

const Dairy = () => {
  const { isRegional } = useLanguage(); // Accessing the current language state

  const translations = {
    en: {
      milk: "Milk",
      doubleTonnedMilk: "Double Tonned Milk (FAT 1.5 %, SNF 9.0 %)",
      sachets250500: "250 ML and 500 ML Sachets",
      dailyProduction6000: "Daily Production: 6000 litres",
      pasteurisedCowMilk: "Pasteurised Cow Milk (FAT 3.5 %, SNF 8.5 %)",
      sachets500: "500 ML Sachets",
      dailyProduction8500: "Daily Production: 8500 litres",
      homogenisedMilk: "Homogenised Full Cream Milk (Fat 6.0%, SNF 9.0%)",
      sachets5001000: "500 ml sachets and 1000 ml sachets",
      dailyProduction4500: "Daily Production: 4500 Litres",
      standardisedMilk: "Pasteurised Standardised Milk (Fat 4.5%, SNF 8.5%)",
      sachets250: "250 ml sachets",
      dailyProduction750: "Daily Production: 750 Litres",
      products: "Products",
      milkPeda: "Milk Peda (50 gm, 250 gm)",
      curd: "Curd (170 gm, 500 gm)",
      butterMilk: "Butter Milk (200 ml)",
      ghee: "Ghee (500 gm)",
      gheeMysorePa: "Ghee Mysore pa (250 gm)",
      longKulfi: "Long Kulfi (25 ml)",
      chocolate: "Chocolate (20 gm)",
    },
    regional: {
      milk: "பால்",
      doubleTonnedMilk: "இரட்டைப் பால் (கொழுப்பு 1.5 %, SNF 9.0 %)",
      sachets250500: "250 மில்லி மற்றும் 500 மில்லி பைகளில்",
      dailyProduction6000: "நாளொன்றின் உற்பத்தி: 6000 லிட்டர்",
      pasteurisedCowMilk: "பாஸ்ட்ரியூஸ் பசு பால் (கொழுப்பு 3.5 %, SNF 8.5 %)",
      sachets500: "500 மில்லி பைகள்",
      dailyProduction8500: "நாளொன்றின் உற்பத்தி: 8500 லிட்டர்",
      homogenisedMilk: "ஒரேமாதிரியான முழு கிரீம் பால் (கொழுப்பு 6.0%, SNF 9.0%)",
      sachets5001000: "500 மில்லி பைகள் மற்றும் 1000 மில்லி பைகள்",
      dailyProduction4500: "நாளொன்றின் உற்பத்தி: 4500 லிட்டர்",
      standardisedMilk: "பாஸ்ட்ரியூஸ் நிலையான பால் (கொழுப்பு 4.5%, SNF 8.5%)",
      sachets250: "250 மில்லி பைகள்",
      dailyProduction750: "நாளொன்றின் உற்பத்தி: 750 லிட்டர்",
      products: "தயாரிப்புகள்",
      milkPeda: "பால் பேடா (50 gm, 250 gm)",
      curd: "மோர் (170 gm, 500 gm)",
      butterMilk: "வெண்ணெய் பால் (200 ml)",
      ghee: "நெய் (500 gm)",
      gheeMysorePa: "நெய் மைசூர் பா (250 gm)",
      longKulfi: "நீண்ட குல்ஃபி (25 ml)",
      chocolate: "சாக்லேட் (20 gm)",
    },
  };

  const t = translations[isRegional ? 'regional' : 'en']; // Accessing the correct translations based on the current language
  const images = [Image1, Image2, Image3, Image4];

  return (
    <div className="bg-gray-100 p-8 flex mt-52">
      {/* Image Slider */}
      <div className="w-1/2 mr-4">
        <Slide>
          {images.map((image, index) => (
            <div className="each-slide" key={index}>
              <div
                style={{ backgroundImage: `url(${image})` }}
                className="h-screen bg-cover bg-center rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105"
              ></div>
            </div>
          ))}
        </Slide>
      </div>

      {/* Dairy Products and Milk Data */}
      <div className="w-1/2 bg-green-100 p-6 rounded-lg shadow-lg animate__animated animate__fadeInRight flex flex-col justify-between">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">{t.milk}</h1>

        {/* Milk Data Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-2 hover:text-green-800 transition duration-300 flex items-center">
            <i className="fas fa-milk-alt mr-2"></i>{t.doubleTonnedMilk}
          </h2>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.sachets250500}</p>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.dailyProduction6000}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-2 hover:text-green-800 transition duration-300 flex items-center">
            <i className="fas fa-milk-alt mr-2"></i>{t.pasteurisedCowMilk}
          </h2>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.sachets500}</p>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.dailyProduction8500}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-2 hover:text-green-800 transition duration-300 flex items-center">
            <i className="fas fa-milk-alt mr-2"></i>{t.homogenisedMilk}
          </h2>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.sachets5001000}</p>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.dailyProduction4500}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-2 hover:text-green-800 transition duration-300 flex items-center">
            <i className="fas fa-milk-alt mr-2"></i>{t.standardisedMilk}
          </h2>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.sachets250}</p>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.dailyProduction750}</p>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">{t.products}</h1>
          <ul className="list-disc pl-6">
            <li className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.milkPeda}</li>
            <li className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.curd}</li>
            <li className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.butterMilk}</li>
            <li className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.ghee}</li>
            <li className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.gheeMysorePa}</li>
            <li className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.longKulfi}</li>
            <li className="text-lg text-gray-700 hover:scale-105 transition duration-300">{t.chocolate}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dairy;
