import React, { useState, useEffect, useRef  } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"; // Importing icons from Heroicons
import axios from "axios";
import imageCompression from "browser-image-compression";

const Dhome = () => {
  const [images, setImages] = useState([]); // State to hold slider image file paths and IDs
  const [products, setProducts] = useState([]); // State to hold product details
  const [events, setEvents] = useState([]);

  const [notifications, setNotifications] = useState([]); // State for notifications
  const [newNotification, setNewNotification] = useState(''); // State for new notification text

  const [employmentNotifications, setEmploymentNotifications] = useState([]); // State for employment notifications
  const [pdfFile, setPdfFile] = useState(null); // State for PDF attachment
  const fileInputRef = useRef(null);
  

  // Fetch images from the database when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/home-slider/"
        );
        const imageUrls = response.data.map((image) => ({
          id: image._id,
          url: `data:image/jpeg;base64,${image.imageUrl}`,
        }));
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []); // Ensure this runs on mount

  // Fetch products from the database when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/home-product/"
        );
        const productData = response.data.map((product) => ({
          id: product._id,
          name: product.name,
          details: product.details,
          imageUrl: product.imageUrl, // Ensure this is a valid image URL
          saved: true,
        }));
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Ensure this runs on mount

  // Fetch Event from the database when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/home-event/"
        );
        const eventData = response.data.map((event) => ({
          id: event._id,
          details: event.details,
          imageUrl: event.imageUrl,
          saved: true,
        }));
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Fetch notifications from the backend
useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/what-new/');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  fetchNotifications();
}, []);

  // Fetch EmployNotifications from the backend
useEffect(() => {
  const fetchEmployNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employnotification/');
      setEmploymentNotifications(response.data);
    } catch (error) {
      console.error('Error fetching setEmploymentNotifications:', error);
    }
  };

  fetchEmployNotifications();
}, []);

  {
    /*Slider Image Upload*/
  }
  const handleAddImage = () => {
    if (images.length < 10) {
      setImages([...images, { id: null, url: "" }]); // Add a new empty object for a new image box
    }
  };

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    const file = event.target.files[0];

    if (file) {
      newImages[index].url = URL.createObjectURL(file); // Create a local URL for the uploaded image
      setImages(newImages);
      uploadImage(file); // Upload the image to the backend
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/home-slider/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeleteImage = async (id) => {
    const confirmation = window.prompt("Type 'Delete' to confirm deletion:");

    if (confirmation === "Delete") {
      try {
        await axios.delete(`http://localhost:5000/api/home-slider/${id}`); // Call delete API
        setImages(images.filter((image) => image.id !== id)); // Update state to remove deleted image
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    } else {
      alert('Deletion cancelled. Please type "Delete" to confirm.');
    }
  };

  {
    /*Our products*/
  }
  const handleAddProduct = () => {
    if (products.length < 10) {
      setProducts([
        ...products,
        { id: null, name: "", details: "", imageUrl: "", saved: false },
      ]);
    }
  };

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const newProducts = [...products];
    newProducts[index][name] = value; // Update product details
    setProducts(newProducts);
  };

  const handleProductImageChange = async (index, event) => {
    const newProducts = [...products];
    const file = event.target.files[0];
  
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);
  
        // Upload the file to your backend
        const response = await axios.post(
          "http://localhost:5000/api/home-product/upload-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        // Use the returned image URL
        newProducts[index].imageUrl = response.data.imageUrl;
        setProducts(newProducts);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  
  const handleSaveProduct = async (index) => {
    const newProducts = [...products];
    const product = newProducts[index];
  
    if (product.name && product.details && product.imageUrl) {
      try {
        await axios.post("http://localhost:5000/api/home-product/add", {
          name: product.name,
          details: product.details,
          imageUrl: product.imageUrl, // Send the base64 string
        });
  
        newProducts[index].saved = true; // Mark the product as saved
        setProducts(newProducts);
      } catch (error) {
        console.error("Error saving product:", error);
      }
    } else {
      alert("Please fill in all product details before saving.");
    }
  };
  

  const handleDeleteProduct = async (id) => {
    const confirmation = window.prompt("Type 'Delete' to confirm deletion:");

    if (confirmation === "Delete") {
      try {
        await axios.delete(`http://localhost:5000/api/home-product/${id}`); // Call delete API
        setProducts(products.filter((product) => product.id !== id)); // Update state to remove deleted product
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    } else {
      alert('Deletion cancelled. Please type "Delete" to confirm.');
    }
  };

  {
    /*Our Event Section*/
  }
  const handleAddEvent = () => {
    if (events.length < 10) {
      setEvents([
        ...events,
        { id: null, details: "", imageUrl: "", saved: false },
      ]);
    }
  };

  const handleEventChange = (index, event) => {
    const { name, value } = event.target;
    const newEvents = [...events];
    newEvents[index][name] = value;
    setEvents(newEvents);
  };

  const handleEventImageChange = async (index, event) => {
    const newEvents = [...events];
    const file = event.target.files[0];

    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();

        reader.onloadend = () => {
          newEvents[index].imageUrl = reader.result;
          setEvents(newEvents);
        };

        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleSaveEvent = async (index) => {
    const newEvents = [...events];
    const event = newEvents[index];

    if (event.details && event.imageUrl) {
      try {
        await axios.post("http://localhost:5000/api/home-event/add", {
          details: event.details,
          imageUrl: event.imageUrl,
        });

        newEvents[index].saved = true;
        setEvents(newEvents);
      } catch (error) {
        console.error("Error saving event:", error);
      }
    } else {
      alert("Please fill in all event details before saving.");
    }
  };

  const handleDeleteEvent = async (id) => {
    const confirmation = window.prompt("Type 'Delete' to confirm deletion:");

    if (confirmation === "Delete") {
      try {
        await axios.delete(`http://localhost:5000/api/home-event/${id}`);
        setEvents(events.filter((event) => event.id !== id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    } else {
      alert('Deletion cancelled. Please type "Delete" to confirm.');
    }
  };

  {/*Notification Section*/}
  {/*Whats new Section*/}

  // Function to add a new notification
  const handleAddNotification = async () => {
    if (newNotification.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/api/what-new/add', { text: newNotification });
        setNotifications([response.data, ...notifications]);
        setNewNotification('');
      } catch (error) {
        console.error('Error adding notification:', error);
      }
    }
  };

  // Delete a notification
const handleDeleteNotification = async (id) => {
  const confirmation = window.prompt("Type 'Delete' to confirm deletion:");
  if (confirmation === 'Delete') {
    try {
      await axios.delete(`http://localhost:5000/api/what-new/${id}`);
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  } else {
    alert('Deletion cancelled. Please type "Delete" to confirm.');
  }
};

 {/* employee Section*/}
// Function to handle adding employment notification
// Function to handle adding employment notification
const handleAddEmploymentNotification = async () => {
  if (newNotification && pdfFile) {
    const formData = new FormData();
    formData.append('text', newNotification);
    formData.append('pdfUrl', pdfFile); // Send the PDF file in form data

    try {
      const response = await fetch('http://localhost:5000/api/employnotification/add', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setEmploymentNotifications([...employmentNotifications, data]);
        setNewNotification('');
        setPdfFile(null);
        fileInputRef.current.value = ''; // Reset the file input
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error adding employment notification:', error);
    }
  }
};

// Function to handle PDF file selection
const handlePdfChange = (event) => {
  setPdfFile(event.target.files[0]); // Save the selected PDF file
};

// Function to handle deletion of employment notifications
const handleDeleteEmploymentNotification = async (id) => {
  const confirmation = window.prompt("Type 'Delete' to confirm deletion:");

  if (confirmation === "Delete") {
    try {
      await axios.delete(`http://localhost:5000/api/employnotification/${id}`);
      // Update state to remove the deleted notification from the UI
      setEmploymentNotifications(prevNotifications => 
        prevNotifications.filter((employNot) => employNot._id !== id)
      );
    } catch (error) {
      console.error("Error deleting employment notification:", error);
    }
  } else {
    alert('Deletion cancelled. Please type "Delete" to confirm.');
  }
};

  return (
    <div className="p-2">
      <div>
      <h1 className="text-3xl font-bold mb-4">Home</h1> {/* Main Title */}
      <h2 className="text-2xl font-semibold mb-2">Home Slider</h2>{" "}
      {/* Slider Title */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((image, index) => (
          <div
            key={image.id || index}
            className="relative border rounded-lg p-2 bg-gray-100"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(index, event)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {image.url ? (
              <>
                <button
                  onClick={() => handleDeleteImage(image.id)} // Delete button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                <img
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg" // Decreased height
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-24 border-dashed border-2 border-gray-400 rounded-lg">
                {" "}
                {/* Decreased height */}
                <PhotoIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Button to add new image box */}
      {images.length < 10 && (
        <button
          onClick={handleAddImage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Slider
        </button>
      )}
    </div>
      {/* Our Products Heading */}
      <div>
      <h2 className="text-2xl font-semibold mt-6">Our Products</h2>
      <div className="grid grid-cols-5 gap-8 mt-2">
        {products.map((product, index) => (
          <div
            key={product.id || index}
            className="border rounded-lg p-2 bg-gray-100 h-48 w-60"
          >
            {product.saved ? ( // Show saved product view
              <div className="flex flex-col items-center relative">
                {" "}
                {/* Added relative position */}
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={`Product ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg mb-2"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.details}</p>{" "}
                {/* Show product details */}
                {/* Ensure this button is inside the flex container */}
                <button
                  onClick={() => handleDeleteProduct(product.id)} // Delete button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ) : (
              // Show input fields for new product
              <div className="flex flex-col">
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(event) => handleProductChange(index, event)}
                  placeholder="Product Name"
                  className="border rounded p-1 mb-2"
                />
                <input
                  type="text"
                  name="details"
                  value={product.details}
                  onChange={(event) => handleProductChange(index, event)}
                  placeholder="Product Details"
                  className="border rounded p-1 mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleProductImageChange(index, event)}
                  className="border rounded p-1 mb-2"
                />
                <button
                  onClick={() => handleSaveProduct(index)} // Save button
                  className="bg-green-500 text-white rounded p-1"
                >
                  Save Product
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Button to add new product */}
      {products.length < 10 && (
        <button
          onClick={handleAddProduct}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Product
        </button>
      )}
      </div>

      {/*Our Event*/}
      <div>
      <h2 className="text-2xl font-semibold mt-6">Our Events</h2>
      <div className="grid grid-cols-5 gap-8 mt-2">
        {events.map((event, index) => (
          <div
            key={event.id || index}
            className="border rounded-lg p-2 bg-gray-100 h-48 w-60"
          >
            {event.saved ? (
              <div className="flex flex-col items-center relative">
                <img
                  src={event.imageUrl}
                  alt={`Event ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg mb-2"
                />
                <p className="text-gray-600 text-sm">{event.details}</p>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <input
                  type="text"
                  name="details"
                  value={event.details}
                  onChange={(event) => handleEventChange(index, event)}
                  placeholder="Event Details"
                  className="border rounded p-1 mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleEventImageChange(index, event)}
                  className="border rounded p-1 mb-2"
                />
                <button
                  onClick={() => handleSaveEvent(index)}
                  className="bg-green-500 text-white rounded p-1"
                >
                  Save Event
                </button>
              </div>
            )}
          </div>
        ))}
        
      </div>
      {events.length < 10 && (
          <button
            onClick={handleAddEvent}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Event
          </button>
        )}
        </div>

       {/* Notifications Section */}
<div className="mt-6">
  <h2 className="text-2xl font-semibold">Notifications</h2>
  <h3 className="text-lg mb-2">What's New</h3>
  
  <div className="flex flex-col">
    <textarea
      value={newNotification}
      onChange={(e) => setNewNotification(e.target.value)}
      placeholder="Add new notification..."
      className="border rounded p-2 mb-2"
    />
    <button
      onClick={handleAddNotification}
      className="bg-blue-500 text-white rounded p-1 mb-4"
    >
      Add Notification
    </button>

    {notifications.map((notification) => (
      <div
        key={notification._id}
        className="border rounded-lg p-2 bg-gray-100 mb-2 relative"
      >
        <p>{notification.text}</p>
        <button
          onClick={() => handleDeleteNotification(notification._id)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    ))}
  </div>
    </div>
   {/* Employment Notifications Section */}
<div className="mt-6">
  <h2 className="text-2xl font-semibold">Employment Notifications</h2>
  <h3 className="text-lg mb-2">Add New Employment Notification</h3>

  <div className="flex flex-col mb-4">
    <textarea
      value={newNotification}
      onChange={(e) => setNewNotification(e.target.value)}
      placeholder="Employment Notification..."
      className="border rounded p-2 mb-2"
    />
    <input
      type="file"
      accept="application/pdf"
      onChange={handlePdfChange}
      className="border rounded p-1 mb-2"
      ref={fileInputRef} 
    />
    <button
      onClick={handleAddEmploymentNotification}
      className="bg-blue-500 text-white rounded p-1"
    >
      Add Employment Notification
    </button>
  </div>

  {employmentNotifications.map((employmentNotification) => (
    <div key={employmentNotification._id} className="border rounded-lg p-2 bg-gray-100 mb-2 relative">
      <p>{employmentNotification.text}</p>
      {employmentNotification.pdfUrl && (
        <a
          href={`http://localhost:5000/${employmentNotification.pdfUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      )}
      <button
        onClick={() => handleDeleteEmploymentNotification(employmentNotification._id)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  ))}
</div>
</div>  
  );
};

export default Dhome;
