import React from "react";
import footerLogo from "../assets/logo/footerLogo.png";

const Footer = ({ className }) => {
  return (
    <>
      <div className={`bg-[#007ac5] text-white py-8 w-full ${className}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around items-center">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-6 md:mb-0 animate-logo"> {/* Added animation class */}
            <img
              src={footerLogo}
              alt="Company Logo"
              className="w-40 h-auto mb-2" // Increased logo size
            />
            <p className="text-center">
              THE KANYAKUMARI DISTRICT COOPERATIVE MILK PRODUCERS UNION LTD.
              <br />
              K.P. ROAD, NAGERCOIL – 629 003.
              <br />
              Tel: 04652-230356
              <br />
              Fax: 04652-230785
              <br />
              Email ID:{" "}
              <a href="mailto:aavinkk@gmail.com" className="text-white underline">
                aavinkk@gmail.com
              </a>
            </p>
          </div>

          {/* Useful Links Section */}
          <div className="mb-4 md:ml-4 animate-links"> {/* Added animation class */}
            <h4 className="font-bold mb-2 text-center md:text-left">Useful Links:</h4>
            <ul className="flex flex-col space-y-1">
              <li>
                <a href="#tender" className="hover:underline">
                  Tender
                </a>
              </li>
              <li>
                <a href="#employment" className="hover:underline">
                  Employment Notice
                </a>
              </li>
              <li>
                <a href="#forms" className="hover:underline">
                  Forms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="bg-[#8BC34A] text-white text-center py-3 shadow-md">
        <p className="text-sm">Copyright © 2018. TNCMPFL. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
