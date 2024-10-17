import React from 'react';
import ghee1 from '../../assets/Product/p1.jpg'; 
import ghee2 from '../../assets/Product/p2.jpg'; 
import ghee3 from '../../assets/Product/p3.jpg'; 
import ghee4 from '../../assets/Product/p4.jpg'; 
import mp1 from '../../assets/Product/i6.jpg'; 
import mp2 from '../../assets/Product/i7.jpg'; 
import butterMilk1 from '../../assets/Product/m6.jpg'; 
import butter from '../../assets/Product/c15.jpg'; 
import curd1 from '../../assets/Product/m7.jpg'; 
import curd2 from '../../assets/Product/m8.jpg'; 
import SMP from '../../assets/Product/i8.jpg'; 
import DryF from '../../assets/Product/p8.jpg'; 
import FM from '../../assets/Product/p9.jpg'; 
import MS1 from '../../assets/Product/p10.jpg'; 
import MS2 from '../../assets/Product/p11.jpg'; 
import MS3 from '../../assets/Product/p12.jpg'; 
import other1 from '../../assets/Product/p13.jpg'; 
import other2 from '../../assets/Product/p14.jpg'; 

const categorizedProducts = {
  Ghee: [
    { id: 1, name: "Ghee 1000ml", img: ghee1, price: "Rs. 495.00" },
    { id: 2, name: "Ghee 5000ml", img: ghee2, price: "Rs. 2450.00" },
    { id: 3, name: "Ghee 500ml", img: ghee3, price: "Rs. 255.00" },
    { id: 4, name: "Ghee 200ml", img: ghee4, price: "Rs. 110.00" },
  ],
  "Milk Peda": [
    { id: 1, name: "Milk Peda 250gm", img: mp1, price: "Rs. 110.00" },
    { id: 2, name: "Milk Peda 50gm", img: mp2, price: "Rs. 22.00" },
  ],
  "Butter Milk": [
    { id: 1, name: "Butter Milk 200ml", img: butterMilk1, price: "Rs. 8.00" },
  ],
  Butter: [
    { id: 1, name: "Cooking Butter 500gm", img: butter, price: "Rs. 240.00" },
    { id: 1, name: "Table Butter 100gm", img: butter, price: "Rs. 50.00" },
  ],
  Curd: [
    { id: 1, name: "Curd 500ml", img: curd1, price: "Rs. 27.00" },
    { id: 2, name: "Curd 200ml", img: curd2, price: "Rs. 11.00" },
    { id: 3, name: "Curd 170ml", img: curd2, price: "Rs. 10.00" },
  ],
  SMP: [
    { id: 1, name: "Skimmed Milk Powder 500gm", img: SMP, price: "Rs. 160.00" },
  ],
  "Dry Fruit Mix": [
    { id: 1, name: "Dry Fruit Mix 200gm", img: DryF, price: "Rs. 120.00" },
  ],
  "FM Tetra": [
    { id: 1, name: "Strawberry Flavoured Milk 200 ml", img: FM, price: "Rs. 25.00" },
  ],
  "Milk Shake": [
    { id: 1, name: "Chocolate Milk Shake 200ml", img: MS1, price: "Rs. 25.00" },
    { id: 2, name: "Badam Milk Shake 200ml", img: MS2, price: "Rs. 25.00" },
    { id: 3, name: "Vanilla Milk Shake 200ml", img: MS3, price: "Rs. 25.00" },
  ],
  Others: [
    { id: 1, name: "Ghee Mysore Pa 250gm", img: other1, price: "Rs. 120.00" },
    { id: 2, name: "Badam Mix 200gm", img: other2, price: "Rs. 80.00" },
  ]
};

const AllProducts = () => {
    return (
      <div className="p-6">
        {Object.keys(categorizedProducts).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categorizedProducts[category].map(({ id, name, img, price }) => (
                <div 
                  key={id} 
                  className="bg-gradient-to-r from-blue-200 to-indigo-400 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 p-3"
                >
                  <img 
                    src={img} 
                    alt={name} 
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                  />
                  <h3 className="text-sm font-bold mt-2 text-blue-900">{name}</h3>
                  <p className="text-xs text-indigo-800 font-semibold">{price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default AllProducts;
  
  
