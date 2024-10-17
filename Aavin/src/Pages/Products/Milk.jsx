import React from 'react';
import product1 from '../../assets/Product/m1.jpg'; 
import product2 from '../../assets/Product/m2.jpg'; 
import product3 from '../../assets/Product/m3.jpg'; 
import product4 from '../../assets/Product/m4.jpg'; 
import product5 from '../../assets/Product/m5.jpg'; 


const milkProducts = [
  { id: 1, name: "Full Cream Milk (FCM) 500ml", img: product1, price: "500ml" },
  { id: 2, name: "Cow Milk 500ml", img: product2, price: "Rs. 24.00" },
  { id: 2, name: "Double Toned Milk (DTM) 500ml", img: product3, price: "Rs.22.00" },
  { id: 2, name: "Double Toned Milk (DTM) 250ml", img: product4, price: "Rs. 11.00" },
  { id: 2, name: "Standardized milk (SM) 250ml", img: product5, price: "Rs. 12.50" },
];

const Milk = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Milk Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {milkProducts.map(({ id, name, img, price }) => (
          <div 
            key={id} 
            className="bg-gradient-to-r from-blue-200 to-green-300 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 p-4"
          >
            <img 
              src={img} 
              alt={name} 
              className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            />
            <h3 className="text-lg font-bold mt-4 text-blue-900">{name}</h3>
            <p className="text-sm text-indigo-800 font-semibold">{price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Milk;
