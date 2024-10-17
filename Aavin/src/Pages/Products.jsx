import React, { useState } from 'react';
import { FaBox, FaIceCream } from 'react-icons/fa';
import { LuMilk } from "react-icons/lu";
import Proimg from '../assets/Procurement/about.jpg';
import AllProducts from './Products/AllProducts';
import Milk from './Products/Milk';
import IceCream from './Products/IceCream';

const Products = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className='mt-52'>
      {/* Banner */}
      <div className="relative">
        <img 
          src={Proimg} 
          alt="Procurement Background" 
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white bg-black bg-opacity-50 rounded-lg">PRODUCTS</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mt-8 space-x-6">
        <button 
          onClick={() => handleTabClick("all")} 
          className={`flex items-center px-4 py-2 font-semibold text-lg rounded-full shadow-md ${selectedTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"} transition duration-300`}
        >
          <FaBox className="mr-2" />
          Products
        </button>
        <button 
          onClick={() => handleTabClick("milk")} 
          className={`flex items-center px-4 py-2 font-semibold text-lg rounded-full shadow-md ${selectedTab === "milk" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-green-400 hover:text-white"} transition duration-300`}
        >
          <LuMilk className="mr-2" />
          Milk
        </button>
        <button 
          onClick={() => handleTabClick("ice-cream")} 
          className={`flex items-center px-4 py-2 font-semibold text-lg rounded-full shadow-md ${selectedTab === "ice-cream" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-pink-400 hover:text-white"} transition duration-300`}
        >
          <FaIceCream className="mr-2" />
          Ice Cream
        </button>
      </div>

      {/* Content Based on Selected Tab */}
      <div className="p-6">
        {selectedTab === "all" && <AllProducts />}
        {selectedTab === "milk" && <Milk />}
        {selectedTab === "ice-cream" && <IceCream />}
      </div>
    </div>
  );
}

export default Products;
