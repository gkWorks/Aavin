import React, { useState, useEffect } from 'react';

const Milk = () => {
  const [milks, setMilks] = useState([]); // State to store milk entries

  // Function to fetch milk data
  const fetchMilks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/milk');
      const data = await response.json();
      setMilks(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching milk data:', error);
    }
  };

  // Fetch milk data on component mount
  useEffect(() => {
    fetchMilks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Milk Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {milks.map(({ _id, name, image, price }) => (
          <div 
            key={_id} 
            className="bg-gradient-to-r from-blue-200 to-green-300 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 p-4"
          >
            <img 
              src={`http://localhost:5000${image}`} // Use the image from the fetched data
              alt={name} 
              className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            />
            <h3 className="text-lg font-bold mt-4 text-blue-900">{name}</h3>
            <p className="text-sm text-indigo-800 font-semibold">RS: {price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Milk;
