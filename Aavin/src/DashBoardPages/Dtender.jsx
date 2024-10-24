import React, { useState, useEffect, useRef } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Import trash icon

const Dtender = () => {
  // State to manage tender data
  const [tenders, setTenders] = useState([]);
  const [tenderData, setTenderData] = useState({
    tender: '',
    nature: '',
    dateOfPosting: '',
    dateOfExpiry: '',
    tenderDocument: null, // Change to null initially for file handling
  });

  // Reference to the file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tenders');
        const data = await response.json();
        if (response.ok) {
          setTenders(data.map((tender, index) => ({ ...tender, sno: index + 1 })));
        }
      } catch (error) {
        console.error('Error fetching tenders:', error);
      }
    };
    fetchTenders();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenderData({
      ...tenderData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setTenderData({
      ...tenderData,
      tenderDocument: e.target.files[0], // Store the file object
    });
  };

  // Function to format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle adding a new tender
  const handleAddTender = async () => {
    if (tenderData.tender && tenderData.nature && tenderData.tenderDocument) {
      // Prepare form data for submission
      const formData = new FormData();
      formData.append('tender', tenderData.tender);
      formData.append('nature', tenderData.nature);
      formData.append('dateOfPosting', tenderData.dateOfPosting);
      formData.append('dateOfExpiry', tenderData.dateOfExpiry);
      formData.append('tenderDocument', tenderData.tenderDocument); // Attach the actual file

      try {
        const response = await fetch('http://localhost:5000/api/tenders', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const savedTender = await response.json();
          setTenders([...tenders, { ...savedTender, sno: tenders.length + 1 }]);
          
          // Reset form after adding
          setTenderData({
            tender: '',
            nature: '',
            dateOfPosting: '',
            dateOfExpiry: '',
            tenderDocument: null,
          });
          // Clear the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = null; // Reset file input
          }
        } else {
          alert('Failed to add tender');
        }
      } catch (error) {
        console.error('Error adding tender:', error);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  // Handle deleting a tender
  const handleDeleteTender = async (id) => {
    const confirmation = window.prompt("Type 'Delete' to confirm deletion:");

    if (confirmation === "Delete") {
      console.log("Deleting tender with ID:", id); // Log the ID
      try {
        const response = await fetch(`http://localhost:5000/api/tenders/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setTenders(tenders.filter((tender) => tender._id !== id));
        } else {
          alert('Failed to delete tender');
        }
      } catch (error) {
        console.error('Error deleting tender:', error);
      }
    } else {
      alert('Deletion cancelled. Please type "Delete" to confirm.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tender</h1>
      
      {/* Form to add tender */}
      <div className="mb-4">
        <input
          type="text"
          name="tender"
          value={tenderData.tender}
          onChange={handleChange}
          placeholder="Tender"
          className="border rounded p-2 mr-2"
          required
        />
        <input
          type="text"
          name="nature"
          value={tenderData.nature}
          onChange={handleChange}
          placeholder="Nature"
          className="border rounded p-2 mr-2"
          required
        />
        <input
          type="date"
          name="dateOfPosting"
          value={tenderData.dateOfPosting}
          onChange={handleChange}
          className="border rounded p-2 mr-2"
        />
        <input
          type="date"
          name="dateOfExpiry"
          value={tenderData.dateOfExpiry}
          onChange={handleChange}
          className="border rounded p-2 mr-2"
        />
        <input
          type="file"
          name="tenderDocument"
          onChange={handleFileChange}
          accept="application/pdf" // Only allow PDF uploads
          className="border rounded p-2 mr-2"
          ref={fileInputRef} // Attach ref to the file input
          required
        />
        <button
          onClick={handleAddTender}
          className="bg-blue-500 text-white rounded p-2"
        >
          Add Tender
        </button>
      </div>

      {/* Table to display tenders */}
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">S.No</th>
            <th className="border p-2">Tender</th>
            <th className="border p-2">Nature</th>
            <th className="border p-2">Date of Posting</th>
            <th className="border p-2">Date of Expiry</th>
            <th className="border p-2">Tender Document</th>
            <th className="border p-2">Actions</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender._id}>
              <td className="border p-2">{tender.sno}</td>
              <td className="border p-2" style={{ wordWrap: 'break-word', maxWidth: '150px' }}>
                {tender.tender}
              </td>
              <td className="border p-2" style={{ wordWrap: 'break-word', maxWidth: '150px' }}>
                {tender.nature}
              </td>
              <td className="border p-2">{formatDate(tender.dateOfPosting)}</td>
              <td className="border p-2">{formatDate(tender.dateOfExpiry)}</td>
              <td className="border p-2">
                <a href={`http://localhost:5000${tender.tenderDocument}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View PDF
                </a>
              </td>
              <td className="border p-2 text-center">
                <FaTrashAlt
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteTender(tender._id)} // Call delete function
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dtender;
