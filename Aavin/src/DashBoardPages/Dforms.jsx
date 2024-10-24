import React, { useState, useRef, useEffect } from 'react';

const Dforms = () => {
  const [formData, setFormData] = useState({
    name: '',
    pdfFile: null,
  });
  const [forms, setForms] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch all forms on component mount
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/forms');
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, pdfFile: e.target.files[0] });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name && formData.pdfFile) {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('pdfFile', formData.pdfFile);

      try {
        const response = await fetch('http://localhost:5000/api/forms', {
          method: 'POST',
          body: formDataToSend,
        });

        if (response.ok) {
          alert('Form uploaded successfully!');
          setFormData({ name: '', pdfFile: null });
          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
          fetchForms(); // Refresh the list
        } else {
          alert('Failed to upload form');
        }
      } catch (error) {
        console.error('Error uploading form:', error);
      }
    } else {
      alert('Please provide a name and select a PDF file.');
    }
  };

  // Handle delete form
  const handleDelete = async (id) => {
    const confirmation = window.prompt("Type 'Delete' to confirm deletion:");

    if (confirmation === "Delete") {
      console.log("Deleting form with ID:", id); // Log the ID
      try {
        const response = await fetch(`http://localhost:5000/api/forms/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Form deleted successfully!');
          fetchForms(); // Refresh the list
        } else {
          alert('Failed to delete form');
        }
      } catch (error) {
        console.error('Error deleting form:', error);
      }
    } else {
      alert('Deletion cancelled. Please type "Delete" to confirm.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Form</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Form Name"
          className="border rounded p-2 mr-2"
          required
        />
        <input
          type="file"
          name="pdfFile"
          onChange={handleFileChange}
          accept="application/pdf"
          className="border rounded p-2 mr-2"
          ref={fileInputRef}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2"
        >
          Upload Form
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Uploaded Forms</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b p-2 text-left">Form Name</th>
              <th className="border-b p-2 text-left">Document</th>
              <th className="border-b p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form._id} className="border-b">
                <td className="border p-2 text-left" style={{ wordWrap: 'break-word', maxWidth: '200px' }}>
                  {form.name}
                </td>
                <td className="border p-2">
                  <a href={`http://localhost:5000${form.pdfFile}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View PDF
                  </a>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="bg-red-500 text-white rounded p-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dforms;
