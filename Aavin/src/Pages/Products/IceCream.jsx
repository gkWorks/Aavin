import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IceCream = () => {
  const [iceCreamProducts, setIceCreamProducts] = useState({
    Candy: [],
    Cones: [],
    "Ice-Cream Bowl": [],
    "Ice-Cream Packs": [],
    Others: []
  });

  // Fetch ice cream data from the backend
  useEffect(() => {
    const fetchIceCreams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/icecreams');
        const data = response.data;

        // Categorize ice creams by type
        const categorized = {
          Candy: data.filter(item => item.type === "Candy"),
          Cones: data.filter(item => item.type === "Cones"),
          "Ice-Cream Bowl": data.filter(item => item.type === "Ice-Cream Bowl"),
          "Ice-Cream Packs": data.filter(item => item.type === "Ice-Cream Packs"),
          Others: data.filter(item => item.type === "Others")
        };

        setIceCreamProducts(categorized);
      } catch (error) {
        console.error('Error fetching ice creams:', error);
      }
    };

    fetchIceCreams();
  }, []);

  return (
    <div className="p-6">
      {Object.keys(iceCreamProducts).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-pink-500">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {iceCreamProducts[category].map(({ _id, name, image, price }) => (
              <div 
                key={_id} 
                className="bg-gradient-to-r from-indigo-200 to-pink-300 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 p-4"
              >
                <img 
                  src={`http://localhost:5000${image}`} 
                  alt={name} 
                  className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                />
                <h3 className="text-lg font-bold mt-4 text-blue-900">{name}</h3>
                <p className="text-sm text-indigo-800 font-semibold">Rs: {price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IceCream;
