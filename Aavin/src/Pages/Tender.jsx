import React from 'react';
import pdf1 from '../assets/PDF/Mahesh Kumar Resume.pdf (3).pdf';
import pdf2 from '../assets/PDF/Resume.pdf';

// Sample data for the tenders
const tenderData = [
  {
    id: 1,
    tender: 'Tender 1',
    nature: 'Nature 1',
    dateOfPosting: '2024-10-01',
    dateOfExpiry: '2024-10-15',
    document: pdf1, // Update with the actual path to your PDF
  },
  {
    id: 2,
    tender: 'Tender 2',
    nature: 'Nature 2',
    dateOfPosting: '2024-10-02',
    dateOfExpiry: '2024-10-20',
    document: pdf2, // Update with the actual path to your PDF
  },
  {
    id: 3,
    tender: 'Tender 3',
    nature: 'Nature 3',
    dateOfPosting: '2024-10-02',
    dateOfExpiry: '2024-10-20',
    document: pdf2,
  },
  {
    id: 4,
    tender: 'Tender 4',
    nature: 'Nature 4',
    dateOfPosting: '2024-10-02',
    dateOfExpiry: '2024-10-20',
    document: pdf2,
  },
  {
    id: 5,
    tender: 'Tender 5',
    nature: 'Nature 5',
    dateOfPosting: '2024-10-02',
    dateOfExpiry: '2024-10-20',
    document: pdf2,
  },
  // Add more tenders as needed
];

const Tender = () => {
  // Function to handle the PDF view
  const handleViewPdf = (pdf) => {
    // Open the PDF in a new tab
    window.open(pdf, '_blank');
  };

  return (
    <div className="p-4 mt-52">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-400">TENDER</h1>
      <table className="min-w-full bg-gray-100 border border-gray-200">
        <thead>
          <tr className="bg-blue-200">
            <th className="border px-2 py-4 w-1/12">S.No</th>
            <th className="border px-4 py-4 w-3/12">Tender</th>
            <th className="border px-4 py-4 w-3/12">Nature</th>
            <th className="border px-2 py-4 w-1/12">Date of Posting</th>
            <th className="border px-2 py-4 w-1/12">Date of Expiry</th>
            <th className="border px-2 py-4 w-1/12">Tender Document</th>
          </tr>
        </thead>
        <tbody>
          {tenderData.map((tender, index) => (
            <tr key={tender.id} className="hover:bg-gray-200">
              <td className="border px-2 py-4">{index + 1}</td>
              <td className="border px-4 py-4">{tender.tender}</td>
              <td className="border px-4 py-4">{tender.nature}</td>
              <td className="border px-2 py-4">{tender.dateOfPosting}</td>
              <td className="border px-2 py-4">{tender.dateOfExpiry}</td>
              <td className="border px-2 py-4">
                <button
                  className="text-blue-500 underline"
                  onClick={() => handleViewPdf(tender.document)}
                >
                  View PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tender;
