import React from 'react';
import ice1 from '../../assets/Product/i2.jpg';
import ice2 from '../../assets/Product/i1.jpg';
import ice3 from '../../assets/Product/c1.jpg';
import ice4 from '../../assets/Product/c2.jpg';
import ice5 from '../../assets/Product/c3.jpg';
import ice6 from '../../assets/Product/c4.jpg';
import ice7 from '../../assets/Product/c5.jpg';
import ice8 from '../../assets/Product/c6.jpg';
import ice9 from '../../assets/Product/i4.jpg';
import ice10 from '../../assets/Product/i5.jpg';
import ice11 from '../../assets/Product/c7.jpg';
import ice12 from '../../assets/Product/c8.jpg';
import ice13 from '../../assets/Product/c9.jpg';
import ice14 from '../../assets/Product/c10.jpg';
import ice15 from '../../assets/Product/c11.jpg';
import ice16 from '../../assets/Product/c12.jpg';
import ice17 from '../../assets/Product/c13.jpg';
import ice18 from '../../assets/Product/c14.jpg';

// Categorize ice cream products
const iceCreamProducts = {
  Candy: [
    { id: 1, name: "Chocobar 65ml", img: ice1, price: "Rs. 20.00" },
    { id: 2, name: "Kulfi Bar 70ml", img: ice2, price: "Rs. 25.00" },
    { id: 3, name: "Strawberry Candy 60ml", img: ice3, price: "Rs.10.00" },
    { id: 4, name: "Grapes Candy 60ml", img: ice4, price: "Rs.10.00" },
    { id: 5, name: "Orange Candy 60ml", img: ice5, price: "Rs.10.00" },
    { id: 6, name: "Pineapple Candy 60ml", img: ice6, price: "Rs.10.00" },
    { id: 7, name: "Mango Candy 60ml", img: ice7, price: "Rs.10.00" },
    { id: 8, name: "Cola Candy 60ml", img: ice8, price: "Rs.10.00" },
  ],
  Cones: [
    { id: 1, name: "Chocolate Classic Cone 100ml", img: ice9, price: "Rs. 28.00" },
    { id: 2, name: "Vanilla Classic Cone 100ml", img: ice10, price: "Rs. 28.00" },
  ],
  "Ice-Cream Bowl": [
    { id: 1, name: "Vanilla 100ml Bowl", img: ice11, price: "Rs.18.00" },
    { id: 2, name: "Sugar Free Ice cream 100ml Bowl", img: ice12, price: "Rs.25.00" },
    { id: 3, name: "Vanilla 50ml Bowl", img: ice13, price: "Rs.10.00" },
    { id: 4, name: "Mango 50ml Bowl", img: ice14, price: "Rs.10.00" },
  ],
  "Ice-Cream Packs": [
    { id: 1, name: "Party Pack 4500ml", img: ice15, price: "Rs. 600.00" },
    { id: 2, name: "Family Pack 1000ml", img: ice16, price: "Rs. 150.00" },
    { id: 3, name: "Family Pack 500ml", img: ice17, price: "Rs. 75.00" }
    
  ],
  "Milk Chocolate": [
    { id: 1, name: "Nutties 45gm", img: ice18, price: "Rs. 30.00" },
  ],
};

const IceCream = () => {
  return (
    <div className="p-6">
      {Object.keys(iceCreamProducts).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-pink-500">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {iceCreamProducts[category].map(({ id, name, img, price }) => (
              <div 
                key={id} 
                className="bg-gradient-to-r from-indigo-200 to-pink-300 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 p-4"
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
      ))}
    </div>
  );
}

export default IceCream;
