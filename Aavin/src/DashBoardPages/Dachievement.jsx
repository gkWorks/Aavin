import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload, FaTrashAlt, FaRegCalendarAlt } from 'react-icons/fa'; // Import trash icon

const Dachievement = () => {
  const [description, setDescription] = useState('');
  const [heading, setHeading] = useState('');
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State for modal visibility
  const [isUploadStatusOpen, setIsUploadStatusOpen] = useState(false); // State for upload status popup
  const [isFullContentOpen, setIsFullContentOpen] = useState(false); // State for full content popup
  const [fullContent, setFullContent] = useState({}); // State for full content details
  const [dactivements, setDactivements] = useState([]); // State for fetched dactivements
  const [deleteContent, setDeleteContent] = useState(null); // Track content to be deleted
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // State for delete confirmation popup
  const [islinkOpen, setIslinkOpen] = useState(false); // State to control modal visibility
  const [youtubeLink1, setYoutubeLink1] = useState('');
  const [youtubeLink2, setYoutubeLink2] = useState('');
// Function to handle image upload
const handleImageChange = (event) => {
  const file = event.target.files[0]; // Get the first file from the input
  if (file) {
    setImage(file); // Set the image state
    setIsUploadStatusOpen(true); // Open the popup when an image is uploaded
  }
};

   // Fetch all dactivements from the database
  const fetchDactivements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dactivement');
      setDactivements(response.data.allActivements); // Get all activements
    } catch (error) {
      console.error('Error fetching dactivements:', error);
    } 
  };

  useEffect(() => {
    fetchDactivements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    formData.append('heading', heading);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/dactivement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Add the new dactivement to the existing state
      setDactivements([...dactivements, response.data]);
      fetchDactivements();
      
      // Clear the form after submission
      setDescription('');
      setHeading('');
      setImage(null);
      setIsOpen(false); // Close the modal after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleUploadStatus = () => {
    setIsUploadStatusOpen(true);
  };

  const handleRemoveImage = () => {
    setImage(null); // Remove the uploaded image
    setIsUploadStatusOpen(false); // Close the popup
  };

  const handleShowFullContent = (dactivement) => {
    setFullContent(dactivement);
    setIsFullContentOpen(true); // Open full content popup
  };
  const handleDelete = async () => {
    if (deleteContent) {
      try {
        await axios.delete(`http://localhost:5000/api/dactivement/${deleteContent._id}`);
        // Remove the deleted content from the state
        setDactivements(dactivements.filter((item) => item._id !== deleteContent._id));
        setIsDeleteConfirmOpen(false); // Close confirmation modal
        setDeleteContent(null); // Clear the delete state
      } catch (error) {
        console.error('Error deleting dactivement:', error);
      }
    }
  };

  const handleShowDeleteConfirm = (dactivement) => {
    setDeleteContent(dactivement); // Set the content to be deleted
    setIsDeleteConfirmOpen(true); // Open delete confirmation modal
  };

  // Function to fetch YouTube links from the backend
  const fetchYoutubeLinks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-youtube-links');
      const links = response.data.youtubeLinks;

      // Populate the state with the fetched YouTube links
      if (links && links.length >= 2) {
        setYoutubeLink1(links[0]);
        setYoutubeLink2(links[1]);
      }
    } catch (error) {
      console.error('Error fetching YouTube links:', error);
    }
  };

  // Handle modal open, and fetch YouTube links when the modal is opened
  const openModal = () => {
    setIslinkOpen(true);
    fetchYoutubeLinks(); // Fetch YouTube links when the modal opens
  };

  // Function to save YouTube links to the backend
  const handleSave = async () => {
    try {
      // Send YouTube links to the backend
      await axios.post('http://localhost:5000/api/update-youtube-links', {
        youtubeLinks: [youtubeLink1, youtubeLink2],
      });
      setIslinkOpen(false); // Close the modal after saving
      setYoutubeLink1(''); // Clear the fields
      setYoutubeLink2('');
    } catch (error) {
      console.error('Error saving YouTube links:', error);
    }
  };

  // Handle closing the modal when clicking outside of it
  const handleClose = () => {
    setIslinkOpen(false);
  };


  return (
    <div className="px-5"> {/* Added padding left and right */}
      <div className="justify-between items-center mb-4 space-x-2 pt-5">
        <h1 className="text-3xl font-extrabold mb-6 flex justify-center items-center 
               opacity-0 animate-slide-in-bounce text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600
               transform transition-all duration-700 ease-out hover:scale-110 hover:rotate-6 hover:text-white">ACHIEVEMENTS</h1>
      </div>
      <div className='pt-10 space-y-3 flex justify-end'>
  <button
    onClick={openModal} // Open the modal and fetch YouTube links
    className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-indigo-400 text-white rounded-lg 
    border border-white whitespace-normal shadow-lg transition-all duration-300 ease-in-out
    transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-red-600
    hover:border-red-500 focus:outline-none focus:ring-4 focus:ring-black
    animate-pulse hover:animate-none hover:shadow-xl"
  >
    Update Youtube EmbedLink
  </button>
</div>
<div className='pt-3 flex justify-end'>
  <button
    onClick={() => setIsOpen(true)} // Open the modal on button click
    className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-lg 
         border border-white whitespace-normal shadow-lg transition-all duration-300 ease-in-out
         transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600
         hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-black
         animate-pulse hover:animate-none hover:shadow-xl"
  >
    Add New Achievement
  </button>
</div>

      {/* Modal for adding new Dactivement */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Achievement</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Heading:</label>
                <input
                  type="text"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4 flex items-center space-x-5">
                <label className="block mr-2">Image:</label>
                <label className="cursor-pointer flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-lg 
                  border border-white whitespace-normal shadow-lg transition-all duration-300 ease-in-out
                  transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600
                  hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-black
                  animate-pulse hover:animate-none hover:shadow-xl">
                  <FaUpload className="text-2xl text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>
                <button
                  type="button"
                  onClick={handleUploadStatus}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Upload Status
                </button>
              </div>
              {image && <p className="text-sm">Selected File: {image.name}</p>}
              <div className="flex justify-between">
                <button type="button" className="bg-gray-300 text-black p-2 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
                <button type="submit" className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-indigo-600 text-white rounded-lg 
                  border border-white whitespace-normal shadow-lg transition-all duration-300 ease-in-out
                  transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600
                  hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-black
                  animate-pulse hover:animate-none hover:shadow-xl">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Status Popup */}
      {isUploadStatusOpen && image && ( // Ensure the popup opens only if there's an image
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Upload Status</h2>
            <div className="mb-4">
              <img
                src={URL.createObjectURL(image)} // Preview the uploaded image
                alt="Uploaded Preview"
                className="w-full h-auto mb-2"
              />
              <div className="pl-48 space-x-3">
                <button onClick={handleRemoveImage} className="bg-red-500 text-white p-2 rounded">
                  Remove
                </button>
                <button className="bg-gray-300 text-black p-2 rounded" onClick={() => setIsUploadStatusOpen(false)}>
                  Close
                </button>
                </div>
              </div>
          </div>
        </div>
      )}
         {/* Modal for updating YouTube links */}
      {islinkOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClose} // Close modal when clicking outside
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside the modal
          >
            <h2 className="text-xl font-bold mb-4">Update YouTube Links</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">YouTube EmbedLink 1</label>
              <input
                type="text"
                value={youtubeLink1}
                onChange={(e) => setYoutubeLink1(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">YouTube EmbedLink 2</label>
              <input
                type="text"
                value={youtubeLink2}
                onChange={(e) => setYoutubeLink2(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIslinkOpen(false)} // Close modal on cancel
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Full Content Popup */}
      {isFullContentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{fullContent.heading}</h2>
            {fullContent.image && (
              <img src={fullContent.image} alt="Dactivement" className="w-full h-40 object-cover mb-2" />
            )}
            <p className='font-thin text-xs'>{fullContent.description}</p>
            <div className='pl-72'>

            <button className="bg-gray-300 text-black p-2 rounded mt-4 " onClick={() => setIsFullContentOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

        {/* Delete Confirmation Popup */}
        {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="bg-gray-300 text-black p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render fetched dactivements in a grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-8">
            {dactivements.map((dactivement) => (
    <div 
      key={dactivement._id} 
      className="bg-white p-4 rounded shadow mb-4 relative overflow-hidden border cursor-pointer"
      onClick={() => handleShowFullContent(dactivement)} // Show full content on box click
    >
      {/* Enhanced Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent box click event
          handleShowDeleteConfirm(dactivement); // Show delete confirmation
        }}
        className="absolute bottom-3 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110 shadow-lg"
      >
        <FaTrashAlt className="text-xl" /> {/* Made the icon larger */}
      </button>

      <div className="image-wrapper p-2">
        <h3 className="font-bold">{dactivement.heading}</h3>
      </div>

      {/* Display Date */}
      <div className="flex items-center space-x-1">
        <FaRegCalendarAlt className="text-gray-500" />
        <p className="text-sm text-gray-500">{dactivement.date}</p>
      </div>

      {/* Display Image if available */}
      {dactivement.image && (
        <img src={dactivement.image} alt="Dactivement" className="w-full h-40 object-cover my-2" />
      )}

      {/* Limit description to two lines */}
      <p className="line-clamp-2">{dactivement.description}</p>
    </div>
  ))}
      </div>
    </div>
  );
};

export default Dachievement;
