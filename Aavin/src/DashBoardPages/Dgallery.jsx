import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload,FaTrash } from 'react-icons/fa';

const Dgallery = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUploadStatusOpen, setIsUploadStatusOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // ID of the item to delete
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // State for delete confirmation
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setError('');
    setMessage('');

    if (!title || !description || images.length === 0) {
      setError('Please provide all required fields (images, title, and description).');
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('title', title);
    formData.append('description', description);

    try {
      await axios.post('http://localhost:5000/api/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Gallery item added successfully!');
      setImages([]);
      setTitle('');
      setDescription('');
      setIsPopupOpen(false);
      fetchGalleryItems(); // Refresh the gallery items
    } catch (error) {
      console.error('Error adding gallery item:', error.response ? error.response.data : error.message);
      setError('Failed to add gallery item');
    }
  };

  // Fetch gallery items
  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gallery');
      setGalleryItems(response.data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  useEffect(() => {
    fetchGalleryItems(); // Initial fetch on mount
  }, []);

  useEffect(() => {
    fetchGalleryItems(); // Initial fetch on mount
  }, []);

  const handleGalleryItemClick = (item) => {
    setSelectedGalleryItem(item);
  };

  const closeGalleryItemPopup = () => {
    setSelectedGalleryItem(null);
  };

  // Update downloadImages function
  const downloadImages = async () => {
    if (selectedGalleryItem && selectedGalleryItem._id) {
      const link = document.createElement('a');
      link.href = `http://localhost:5000/api/download/images/${selectedGalleryItem._id}`; // Update to new endpoint
      link.download = `gallery-${selectedGalleryItem._id}.zip`; // Optionally set the download filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No images to download');
    }
  };
   // Handle delete confirmation
   const handleDelete = (galleryId) => {
    setItemToDelete(galleryId); // Set the ID of the gallery item to be deleted
    setIsDeleteConfirmOpen(true); // Open confirmation popup
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/gallery/${itemToDelete}`); // Ensure this matches your backend route
        fetchGalleryItems(); // Refresh the gallery items after deletion
        setMessage('Gallery item deleted successfully!');
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        setError('Failed to delete gallery item');
      }
    }
    setIsDeleteConfirmOpen(false); // Close the confirmation popup
  };

  return (
    <div className="relative min-h-screen flex-col items-center pt-5 px-10">
      <h2 className=" text-3xl font-extrabold mb-6 flex justify-center items-center 
               opacity-0 animate-slide-in-bounce text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600
               transform transition-all duration-700 ease-out hover:scale-110 hover:rotate-6 hover:text-white">
  GALLERY
</h2>
      <div className="flex justify-end w-full p-4">
        <button
         className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-lg 
         border border-white whitespace-normal shadow-lg transition-all duration-300 ease-in-out
         transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600
         hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-black
         animate-pulse hover:animate-none hover:shadow-xl"
          onClick={() => setIsPopupOpen(true)}
        >
          Add Album
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
        {galleryItems.map((box, index) => (
          <div
            key={index}
            className="box-content bg-white shadow-lg rounded-lg p-2 relative overflow-hidden border cursor-pointer"
            onClick={() => handleGalleryItemClick(box)}
            style={{ width: '200px', height: '250px' }} // Adjust size as needed
          >
            <div className="image-wrapper p-2">
              <img
                src={`http://localhost:5000${box.images[0]}`}
                alt={box.title}
                className="box-image mb-2 rounded-lg"
                style={{ width: '100%', height: '150px', objectFit: 'cover' }} // Adjust size as needed
              />
            </div>
            <div className="details-overlay text-black">
              <h4 className="text-lg font-semibold">{box.title}</h4>
              <p>{box.description}</p>
            </div>
            <button
              className="delete-icon absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(box._id);
              }}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      {/* Popup for adding new gallery item */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsPopupOpen(false)}></div>

          <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
            <h2 className="text-2xl mb-4">Add New Gallery Item</h2>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="mb-4">
                <label className="block mb-2">Upload Images</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    id="file-input"
                    className="hidden"
                    onChange={handleImageChange}
                    required
                  />
                  <label htmlFor="file-input" className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-lg 
                  border border-white whitespace-normal shadow-lg transition-all duration-300 ease-in-out
                  transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600
                  hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-black
                  animate-pulse hover:animate-none hover:shadow-xl">
                    <FaUpload className="mr-2 pl-1" />
                  </label>
                  <button
                    type="button"
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => setIsUploadStatusOpen(true)}
                  >
                    Upload Status
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  className="border p-2 w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-red-400 text-white p-2 rounded"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg 
                    border border-white whitespace-normal shadow-lg transition-all duration-300 ease-in-out
                    transform hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600
                    hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-black
                    animate-pulse hover:animate-none hover:shadow-xl"
                  onClick={handleSubmit}
                >
                  Add New Gallery
                </button>
              </div>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </div>
      )}

       {/* Confirmation Popup for Delete */}
       {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsDeleteConfirmOpen(false)}></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
            <h2 className="text-lg mb-4">Are you sure you want to delete this item?</h2>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-red-500 text-white p-2 rounded"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                type="button"
                className="bg-gray-300 text-black p-2 rounded"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Popup for upload status */}
      {isUploadStatusOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsUploadStatusOpen(false)}></div>

          <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
            <h2 className="text-2xl mb-4">Upload Status</h2>
            <p className="mb-4">You are about to upload the following images:</p>
            <ul className="mb-4">
              {images.map((image, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded mt-1">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded image ${index}`}
                    className="h-16 w-16 object-cover mr-2"
                  />
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-400 text-white p-2 rounded"
                onClick={() => setIsUploadStatusOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => {
                  handleSubmit();
                  setIsUploadStatusOpen(false);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for gallery item details */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeGalleryItemPopup}></div>

          <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
            <h2 className="text-2xl mb-4">{selectedGalleryItem.title}</h2>
            <p className='text-xs font-thin'>{selectedGalleryItem.description}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Images:</h3>
              <div className="grid grid-cols-3 gap-2">
                {selectedGalleryItem.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000${image}`}
                    alt={`Gallery image ${index}`}
                    className="object-cover w-full h-32 rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                className="bg-red-400 text-white p-2 rounded"
                onClick={closeGalleryItemPopup}
              >
                Close
              </button>
              <button
              type="button"
              onClick={downloadImages}
              className="bg-green-500 text-white p-2 rounded"
            >
              Download
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dgallery;
