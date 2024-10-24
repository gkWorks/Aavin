import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [categorizedProducts, setCategorizedProducts] = useState({});

  // Function to categorize products based on their type
  const categorizeProducts = (products) => {
    const categories = {};
    products.forEach((product) => {
      const { type } = product;
      if (!categories[type]) {
        categories[type] = [];
      }
      categories[type].push(product);
    });
    return categories;
  };

  // Fetch product data from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const products = response.data;
        const categorized = categorizeProducts(products);
        setCategorizedProducts(categorized);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      {Object.keys(categorizedProducts).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categorizedProducts[category].map(({ _id, name, image, price }) => (
              <div 
                key={_id} 
                className="bg-gradient-to-r from-blue-200 to-indigo-400 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 p-3"
              >
                <img 
                  src={`http://localhost:5000${image}`} 
                  alt={name} 
                  className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                />
                <h3 className="text-sm font-bold mt-2 text-blue-900">{name}</h3>
                <p className="text-xs text-indigo-800 font-semibold">Rs: {price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
