import React, { useEffect, useState } from 'react';
import logo from '../assets/logo/logo-a.png';
import stalin from '../assets/Header/cm_stalin.jpeg'; // Add the correct path for the image
import rajakannappan from '../assets/Header/minister_rajakannappan.jpg'; // Add the correct path for the image

const Header = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Top Header with Aavin Milk slogan */}
      <header
        className={`fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 shadow-lg z-30 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto flex items-center justify-center">
          <h1 className="text-lg font-bold text-center">
            Aavin Milk Even Better than Gold
          </h1>
        </div>
      </header>

      {/* Company Logo and Name with Profile Pictures */}
      <section
        className={`fixed mt-10 left-0 w-full bg-white text-[#007ac5] p-6 z-20 transition-transform duration-700 ${visible ? 'translate-y-0' : '-translate-y-10 opacity-0'}`}
      >
        <div className="container mx-auto flex items-center justify-between space-x-4">
          {/* Left Profile Picture */}
          <div className="flex flex-col items-center">
            <img
              src={stalin}
              alt="Thiru MK Stalin"
              className="w-24 h-24 rounded-full"
            />
            <p className="text-center text-sm font-semibold mt-2">
              Thiru MK Stalin<br />
              Hon'ble Chief Minister of Tamil Nadu
            </p>
          </div>

          {/* Company Logo and Name */}
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="Company Logo"
              className="mr-4"
              style={{ width: '170px', height: 'auto' }}
            />
            <h2 className="text-2xl font-semibold text-center">
              The Kanyakumari District Co-operative Milk Producers Union Ltd
            </h2>
          </div>

          {/* Right Profile Picture */}
          <div className="flex flex-col items-center">
            <img
              src={rajakannappan}
              alt="Thiru RS Rajakannappan"
              className="w-24 h-24 rounded-full"
            />
            <p className="text-center text-sm font-semibold mt-2">
              Thiru RS Rajakannappan<br />
              Hon'ble Minister for Milk & Dairy Development
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
