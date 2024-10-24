import React, { useState, useEffect } from 'react';
import { useLanguage } from '../TranslateBtn/LanguageContext';

const Tender = () => {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tenders');
        const data = await response.json();
        if (response.ok) {
          setTenders(data);
        } else {
          alert('Failed to fetch tenders');
        }
      } catch (error) {
        console.error('Error fetching tenders:', error);
      }
    };

    fetchTenders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleViewPdf = (pdf) => {
    window.open(`http://localhost:5000${pdf}`, '_blank');
  };

  const { isRegional } = useLanguage();

  return (
    <div className="p-4 mt-52">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-400">{isRegional ? "டெண்டர்" : "TENDER"}</h1>
      <table className="min-w-full bg-gray-100 border border-gray-200">
        <thead>
          <tr className="bg-blue-200">
            <th className="border px-2 py-4 w-1/12">S.No</th>
            <th className="border px-4 py-4 w-3/12">{isRegional ? "டெண்டர்" : "Tender"}</th>
            <th className="border px-4 py-4 w-3/12">{isRegional ? "வகை" : "Nature"}</th>
            <th className="border px-2 py-4 w-1/12">{isRegional ? "இடுகையிடும் தேதி" : "Date of Posting"}</th>
            <th className="border px-2 py-4 w-1/12">{isRegional ? "காலாவது தேதி" : "Date of Expiry"}</th>
            <th className="border px-2 py-4 w-1/12">{isRegional ? "டெண்டர் ஆவணம்" : "Tender Document"}</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender, index) => (
            <tr key={tender._id} className="hover:bg-gray-200">
              <td className="border px-2 py-4">{index + 1}</td>
              <td className="border px-4 py-4 break-all">{tender.tender}</td> {/* Added break-all */}
              <td className="border px-4 py-4 break-all">{tender.nature}</td> {/* Added break-all */}
              <td className="border px-2 py-4">{formatDate(tender.dateOfPosting)}</td>
              <td className="border px-2 py-4">{formatDate(tender.dateOfExpiry)}</td>
              <td className="border px-2 py-4">
                <button
                  className="text-blue-500 underline"
                  onClick={() => handleViewPdf(tender.tenderDocument)}
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
