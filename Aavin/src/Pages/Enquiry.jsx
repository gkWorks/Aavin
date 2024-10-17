import React, { useState } from 'react';
import enq from '../assets/Enquiry/contact.jpg';

const Enquiry = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    enquiry: '',
    message: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending data to a server)
    console.log(formData);
  };

  return (
    <div className='mt-52'>
      {/* Image with heading */}
      <div className="relative">
        <img
          src={enq}
          alt="Enquiry Background"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white bg-black bg-opacity-50 rounded-lg">
          ENQUIRY
        </h1>
      </div>

      {/* Enquiry Form and Office Details */}
      <div className="flex flex-col md:flex-row p-6 bg-gray-50">
        {/* Enquiry Form */}
        <form className="w-full md:w-2/3 p-6 bg-white rounded-lg shadow-lg border" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Send Us a Message</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Phone No</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Your Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your location"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Enquiry</label>
            <select
              name="enquiry"
              value={formData.enquiry}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Enquiry Type</option>
              <option value="general">Become a New Agent-Retailer / Wholesale Dealer</option>
              <option value="product">Sales Enquiry</option>
              <option value="pricing">Business Enquiry</option>
              <option value="services">Complain / Feedback /Suggestion</option>
              <option value="feedback">Customer Service </option>
              <option value="others">General Enquiry</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your message"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        {/* Office Details */}
        <div className="w-full md:w-1/3 p-6 mt-8 md:mt-0 md:ml-6 bg-blue-100 rounded-lg shadow-lg text-gray-800">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Office:</h2>
          <p className="mb-2 font-semibold">General Manager</p>
          <p className="mb-2">
            The Kanyakumari District Cooperative Milk Producers Union Ltd., K.P.Road,
          </p>
          <p className="mb-2">Nagercoil – 629 003, Tamil Nadu.</p>
          <p className="mb-2"><strong>Email:</strong> aavinkk@gmail.com</p>
          <p className="mb-2"><strong>Tel:</strong> 04652 - 230356</p>
          <p><strong>Fax:</strong> 04652-230785</p>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
