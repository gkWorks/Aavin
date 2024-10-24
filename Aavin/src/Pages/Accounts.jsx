import React from 'react';
import { useLanguage } from '../TranslateBtn/LanguageContext';
import ACCimg from '../assets/Procurement/about.jpg';

const Accounts = () => {
  const { isRegional } = useLanguage(); 

  return (
    <div className='mt-52'>
      <div className="relative">
        <img 
          src={ACCimg} 
          alt={isRegional ? "கணக்குகள் பின்னணி" : "Accounts Background"} 
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <h1 className="absolute inset-0 flex items-center justify-left pl-28 text-4xl font-bold text-white bg-black bg-opacity-50 rounded-lg">
          {isRegional ? "கணக்குகள்" : "ACCOUNTS"}
        </h1>
      </div>

      <div className="p-8 mt-8 mx-4 bg-white rounded-lg shadow-lg animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          {isRegional 
            ? "யூனியனின் லாபம் & இழப்பு 2016-2017 முதல் 2018-2019 வரை (கோடிகளில் ரூபாய்)" 
            : "Profit & Loss of the Union 2016-2017 to 2018-2019 (Rs. In Crore)"
          }
        </h2>
        
        <div className="flex flex-col">
          <div className="flex font-bold text-gray-700 bg-blue-200 p-4 rounded-lg mb-2">
            <div className="flex-1">{isRegional ? "வரிசை எண்" : "S.No"}</div>
            <div className="flex-1">{isRegional ? "ஆண்டு" : "Year"}</div>
            <div className="flex-1">{isRegional ? "நிகர லாபம்/(இழப்பு)" : "Net Profit/(Loss)"}</div>
          </div>

          {[
            { sNo: 1, year: "2016-2017", profit: 1.76 },
            { sNo: 2, year: "2017-2018", profit: 1.54 },
            { sNo: 3, year: "2018-2019", profit: 1.78 },
          ].map(({ sNo, year, profit }) => (
            <div 
              key={sNo} 
              className="flex items-center justify-between p-4 bg-green-100 rounded-lg mb-2 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex-1 text-blue-600">{sNo}</div>
              <div className="flex-1 text-gray-700">{year}</div>
              <div className="flex-1 text-gray-700">{profit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
