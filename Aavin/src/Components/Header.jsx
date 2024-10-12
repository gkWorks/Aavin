import React from 'react';
import logo from '../assets/logo/logo-a.png'


const Header = () => {
  return (
    <>
      {/* Top Header with Aavin Milk slogan */}
      <header className=" top-0 left-0 w-full bg-[#007ac5] text-white p-4 shadow-md z-10">
        <div className="container mx-auto flex items-center">
          <h1 className="text-lg font-semibold">
            Aavin Milk Even Better than Gold
          </h1>
        </div>
      </header>

      {/* Company Logo and Name in the same line */}
      <section className=" top-16 left-0 w-full bg-white text-[#007ac5] p-4  z-10">
        <div className="container mx-auto flex items-center justify-center">
          {/* Company Logo */}
          <img
            src={logo} // Replace with the actual path to your logo
            alt="Company Logo"
            className="mr-4" // Adds some space between the logo and text
            style={{ width: '170px', height: 'auto' }} // Adjust size as needed
          />
          {/* Company Name */}
          <h2 className="text-xl font-semibold">
            The Kanyakumari District Co-operative Milk Producers Union Ltd
          </h2>
        </div>
      </section>
    </>
  );
};

export default Header;
