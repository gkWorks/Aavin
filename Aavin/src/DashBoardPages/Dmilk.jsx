import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Dmilk = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [milks, setMilks] = useState([]); // State to store milk entries
  const [imageKey, setImageKey] = useState(0); // New state to control the file input reset

  // Function to fetch milk data
  const fetchMilks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/milk');
      const data = await response.json();
      setMilks(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching milk data:', error);
    }
  };

  // Fetch milk data on component mount
  useEffect(() => {
    fetchMilks();
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file directly
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('image', image); // Make sure this is the file object
    }
    formData.append('name', name);
    formData.append('price', price);

    try {
      const response = await fetch('http://localhost:5000/api/milk', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Milk added:', data);
      fetchMilks(); // Fetch updated list after adding new milk
      
      // Reset the form
      setImage(null);
      setName('');
      setPrice('');
      setImageKey((prevKey) => prevKey + 1); // Update key to reset the input
    } catch (error) {
      console.error('Error adding milk:', error);
    }
  };

  // Function to delete a milk entry
  const handleDelete = async (id) => {
    const confirmation = window.prompt("Type 'Delete' to confirm deletion:");

    if (confirmation === "Delete") {
      console.log("Deleting milk with ID:", id); // Log the ID
      try {
        const response = await fetch(`http://localhost:5000/api/milk/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchMilks(); // Fetch updated list after deletion
        } else {
          alert('Failed to delete milk entry');
        }
      } catch (error) {
        console.error('Error deleting milk:', error);
      }
    } else {
      alert('Deletion cancelled. Please type "Delete" to confirm.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dmilk</h1>

      <form onSubmit={handleSubmit}>
        {/* Input for image upload */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="mb-4"
          key={imageKey} // Use imageKey to reset the input
          required
        />

        {/* Input for name */}
        <input 
          type="text" 
          placeholder="Enter name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border rounded p-2 mb-4 w-full"
          required
        />

        {/* Input for price */}
        <input 
          type="number" 
          placeholder="Enter price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className="border rounded p-2 mb-4 w-full"
          required
        />

        {/* Add button to submit the form */}
        <button 
          type="submit" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-yellow-500"
        >
          Add
        </button>
      </form>

      {/* Display the uploaded image, name and price */}
      <div className="mt-4">
        {image && (
          <img src={URL.createObjectURL(image)} alt="Dmilk" className="w-40 h-40 object-cover mb-2" />
        )}
        <p className="font-semibold">Name: {name}</p>
        <p className="text-gray-600">RS: {price}</p>
      </div>

      {/* Display milk data in a grid layout */}
      <div className="grid grid-cols-5 gap-4 mt-8">
        {milks.map((milk) => (
          <div key={milk._id} className="border p-2 rounded relative">
            <button
              onClick={() => handleDelete(milk._id)} // Handle delete
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FaTrashAlt />
            </button>
            <img src={`http://localhost:5000${milk.image}`} alt={milk.name} className="w-full h-40 object-cover mb-2" />
            <p className="font-semibold">{milk.name}</p>
            <p className="text-gray-600">RS: {milk.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dmilk;
