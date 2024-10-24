import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Dproduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('type'); // Default type
  const [image, setImage] = useState(null); // State for the image
  const [products, setProducts] = useState([]); // State to store product entries
  const fileInputRef = useRef(null); // Create a ref for the file input

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Adjust the endpoint
        setProducts(response.data); // Set the fetched products to state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('type', type);
    formData.append('image', image);

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Add new entry to the products state
      setProducts([...products, response.data]);

      // Reset form fields
      setName('');
      setPrice('');
      setType('type'); // Reset to default type
      setImage(null); // Reset image
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input field
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Function to handle deletion of product
  const handleDelete = async (id) => {
    const confirmation = window.prompt("Type 'Delete' to confirm deletion:");
  
    if (confirmation === "Delete") {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product entry');
      }
    } else {
      alert('Deletion cancelled. Please type "Delete" to confirm.');
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file directly
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          placeholder="Enter product name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border rounded p-2 mb-2 w-full"
          required
        />
        <input 
          type="number" 
          placeholder="Enter price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className="border rounded p-2 mb-2 w-full"
          required
        />
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          className="border rounded p-2 mb-4 w-full"
          required
        >
          <option value="type">select type</option>
          <option value="Ghee">Ghee</option>
          <option value="Milk Peda">Milk Peda</option>
          <option value="Butter Milk">Butter Milk</option>
          <option value="Butter">Butter</option>
          <option value="Curd">Curd</option>
          <option value="SMP">SMP</option>
          <option value="Dry Fruit Mix">Dry Fruit Mix</option>
          <option value="FM Tetra">FM Tetra</option>
          <option value="Milk Shake">Milk Shake</option>
          <option value="Others">Others</option>
        </select>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          ref={fileInputRef} 
          className="mb-4"
          required
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-yellow-500"
        >
          Add Product
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">Product Entries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-2 rounded shadow-lg">
            <div className="flex flex-col items-center">
              {product.image && (
                <img 
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name} 
                  className="w-24 h-24 object-cover mt-2 rounded-md" 
                />
              )}
              <p className="mt-2 font-bold">{product.name}</p>
              <p>Rs: {product.price}</p>
              <p>Type: {product.type}</p>
              <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700 mt-2">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dproduct;
