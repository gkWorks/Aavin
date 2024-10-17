import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image1 from '../assets/Dairy/16.jpg';
import Image2 from '../assets/Dairy/17.jpg';
import Image3 from '../assets/Dairy/18.jpg';
import Image4 from '../assets/Dairy/19.jpg';
import Image5 from '../assets/Dairy/20.jpg';

const Dairy = () => {
  const images = [Image1, Image2, Image3, Image4, Image5];

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
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Milk</h1>

        {/* Milk Data Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-2 hover:text-green-800 transition duration-300 flex items-center">
            <i className="fas fa-milk-alt mr-2"></i>Double Tonned Milk (FAT 1.5 %, SNF 9.0 %)
          </h2>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">250 ML and 500 ML Sachets</p>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">Daily Production: 6000 litres</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-2 hover:text-green-800 transition duration-300 flex items-center">
            <i className="fas fa-milk-alt mr-2"></i>Pasteurised Cow Milk (FAT 3.5 %, SNF 8.5 %)
          </h2>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">500 ML Sachets</p>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">Daily Production: 8500 litres</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-2 hover:text-green-800 transition duration-300 flex items-center">
            <i className="fas fa-milk-alt mr-2"></i>Homogenised Full Cream Milk (Fat 6.0%, SNF 9.0%)
          </h2>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">500 ml sachets and 1000 ml sachets</p>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">Daily Production: 4500 Litres</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-2 hover:text-green-800 transition duration-300 flex items-center">
            <i className="fas fa-milk-alt mr-2"></i>Pasteurised Standardised Milk (Fat 4.5%, SNF 8.5%)
          </h2>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">250 ml sachets</p>
          <p className="text-lg text-gray-700 hover:scale-105 transition duration-300">Daily Production: 750 Litres</p>
        </div>

        <h1 className="text-3xl font-bold text-center text-blue-600 mt-10 mb-6">Products</h1>

        {/* Products Section */}
        <ul className="list-disc list-inside text-gray-700">
          <li className=" p-2 rounded-lg  hover:bg-blue-200 transition duration-300"><i className="fas fa-cow mr-2"></i>Milk Peda (50 gm, 250 gm)</li>
          <li className=" p-2 rounded-lg  hover:bg-blue-200 transition duration-300"><i className="fas fa-cow mr-2"></i>Curd (170 gm, 500 gm)</li>
          <li className=" p-2 rounded-lg  hover:bg-blue-200 transition duration-300"><i className="fas fa-cow mr-2"></i>Butter Milk (200 ml)</li>
          <li className=" p-2 rounded-lg  hover:bg-blue-200 transition duration-300"><i className="fas fa-cow mr-2"></i>Ghee (500 gm)</li>
          <li className=" p-2 rounded-lg  hover:bg-blue-200 transition duration-300"><i className="fas fa-cow mr-2"></i>Ghee Mysore pa (250 gm)</li>
          <li className=" p-2 rounded-lg  hover:bg-blue-200 transition duration-300"><i className="fas fa-cow mr-2"></i>Long Kulfi (25 ml)</li>
          <li className=" p-2 rounded-lg  hover:bg-blue-200 transition duration-300"><i className="fas fa-cow mr-2"></i>Chocolate (20 gm)</li>
        </ul>
      </div>
    </div>
  );
};

export default Dairy;
