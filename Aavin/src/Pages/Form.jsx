import React, { useState, useEffect } from 'react';
import { GrNotes } from "react-icons/gr"; // Importing an icon from react-icons
import { useLanguage } from '../TranslateBtn/LanguageContext';

const Form = () => {
  const [forms, setForms] = useState([]);

  // Fetch forms from backend
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/forms');
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);


  // Helper function to format date
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

  // Function to handle the PDF view
  const handleViewPdf = (pdfPath) => {
    window.open(`http://localhost:5000${pdfPath}`, '_blank');
  };

  const { isRegional } = useLanguage();

  return (
    <div className="p-4 mt-52">
    <h1 className="text-2xl font-bold mb-4 text-center text-green-500">{isRegional ? "படிவங்கள்" : "Form"}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {forms.map((form) => (
        <div
          key={form._id} // Use _id as the unique key
          className="bg-blue-100 border rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
        >
          {/* Document icon */}
          <div className="flex items-center justify-center bg-blue-300 rounded-full h-20 w-20 mb-4">
            <GrNotes className="text-white h-10 w-10" />
          </div>

          <p className="text-lg font-semibold mb-2  break-words text-center text-ellipsis whitespace-normal max-w-full">
            {form.name}
          </p>
          <p className="text-gray-600 mb-2">{isRegional ? "அன்று வெளியிடப்பட்டது:" : "Published on:"}Published on: {formatDate(form.uploadedAt)}</p>
          <button
            className="mt-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-yellow-500"
            onClick={() => handleViewPdf(form.pdfFile)}
          >
            {isRegional ? "படிவத்தைப் பார்க்கவும்" : "View Form"}
          </button>
        </div>
      ))}
    </div>
  </div>
);
};



export default Form;
