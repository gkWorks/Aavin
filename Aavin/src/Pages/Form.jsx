import React from 'react';
import { GrNotes } from "react-icons/gr"; // Importing an icon from react-icons
import pdf1 from '../assets/PDF/Resume.pdf';

// Sample data for forms
const formData = [
  {
    id: 1,
    formName: 'Form 1',
    publishDate: '2024-10-01',
    document: pdf1, // Update with the actual path to your PDF
  },
  {
    id: 2,
    formName: 'Form 2',
    publishDate: '2024-10-02',
    document: pdf1, // Update with the actual path to your PDF
  },
  {
    id: 3,
    formName: 'Form 3',
    publishDate: '2024-10-03',
    document: pdf1, // Update with the actual path to your PDF
  },
  {
    id: 4,
    formName: 'Form 4',
    publishDate: '2024-10-03',
    document: pdf1, // Update with the actual path to your PDF
  },
  {
    id: 5,
    formName: 'Form 5',
    publishDate: '2024-10-03',
    document: pdf1, // Update with the actual path to your PDF
  },
  {
    id: 6,
    formName: 'Form 6',
    publishDate: '2024-10-03',
    document: pdf1, // Update with the actual path to your PDF
  },
  {
    id: 7,
    formName: 'Form 7',
    publishDate: '2024-10-03',
    document: pdf1, // Update with the actual path to your PDF
  },
  {
    id: 8,
    formName: 'Form 8',
    publishDate: '2024-10-03',
    document: pdf1, // Update with the actual path to your PDF
  },
  // Add more forms as needed
];

const Form = () => {
  // Function to handle the PDF view
  const handleViewPdf = (pdf) => {
    // Open the PDF in a new tab
    window.open(pdf, '_blank');
  };

  return (
    <div className="p-4 mt-52">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-500">Forms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {formData.map((form) => (
          <div
            key={form.id}
            className="bg-blue-100 border rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
          >
            {/* Document icon */}
            <div className="flex items-center justify-center bg-blue-300 rounded-full h-20 w-20 mb-4">
              <GrNotes  className="text-white h-10 w-10" /> {/* Document icon */}
            </div>
            <p className="text-lg font-semibold mb-2">{form.formName}</p>
            <p className="text-gray-600 mb-2">Published on: {form.publishDate}</p>
            <button
              className="mt-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-yellow-500"
              onClick={() => handleViewPdf(form.document)}
            >
              View Form
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
