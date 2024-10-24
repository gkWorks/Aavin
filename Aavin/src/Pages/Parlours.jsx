import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import necessary components from react-leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet';
import aavin1 from '../assets/Parlour/2018-02-08.jpg'; // Correctly import your image
import { useLanguage } from '../TranslateBtn/LanguageContext';

// Import marker images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix the marker icon issue
delete L.Icon.Default.prototype._getIconUrl; // Fix default marker icon not showing
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const center = [8.18281974325375, 77.41415622980811]; // Set your desired latitude and longitude

const parlourDetails = [
  {
    name: "Aavin Parlour Nagercoil",
    address: "Aavin Milk Parlour, Palpannai, KP Road, 5CJ7+XRR, Pleasant Nagar, Nagercoil, Tamil Nadu 629001",
    contact: "123-456-7890",
    location: [8.18281974325375, 77.41415622980811], // Add specific location for each parlour
    image: aavin1, // Use the image directly
  },
  {
    name: "Aavin Hi-tech Parlour, Uzhavar chanthai, Vadasery",
    address: "Indiaமகளிர் கைவினை தொழில்நுட்ப, India, 18, Balamore Rd, Puthukudierupu, Vadasery, Nagercoil, Tamil Nadu 629001",
    contact: "987-654-3210",
    location: [8.190582316502006, 77.4311703798207], // Add specific location for each parlour
    image: aavin1, // Use the image directly
  },
  {
    name: "Aavin Milk Bar",
    address: "Anna Bus Stand, opp. to subway, Meenakshipuram, Vadiveeswaram Village, Nagercoil, Tamil Nadu 629001",
    contact: "987-654-3210",
    location: [8.195714641033618, 77.43933856876444], // Add specific location for each parlour
    image: aavin1, // Use the image directly
  },
];

const Parlours = () => {
  // Set Aavin Parlour Nagercoil details as the default selected parlour
  const [selectedParlour, setSelectedParlour] = useState(parlourDetails[0]); // Initialize with the first parlour's details

  const handleMarkerClick = (parlour) => {
    setSelectedParlour(parlour); // Update the selected parlour when a marker is clicked
  };

  const { isRegional } = useLanguage();

  return (
    <div className='mt-52 flex flex-col'>
      <h1 className='text-2xl text-blue-500 font-bold text-center  mt-2'>{isRegional ? "பார்லர்கள்" : "PARLOURS"}</h1> {/* Heading added here */}
      <div className='flex flex-1'>
        <div className='flex-1 p-6' style={{ maxWidth: '400px' }}>
          {selectedParlour ? ( // Render selected parlour details if available
            <div className='p-4 border rounded-lg shadow-md bg-white'>
              <h2 className='text-xl font-semibold'>{selectedParlour.name}</h2>
              <p>{selectedParlour.address}</p>
              <p>Contact: {selectedParlour.contact}</p>
              <img src={selectedParlour.image} alt={selectedParlour.name} className='w-full h-auto rounded' />
            </div>
          ) : (
            <p>Select a parlour to see details</p>
          )}
        </div>
        <div className='flex-1 p-6'>
          <MapContainer center={center} zoom={12} style={{ height: '500px', width: '100%', position: 'relative', zIndex: 1 }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {parlourDetails.map((parlour, index) => (
              <Marker key={index} position={parlour.location} eventHandlers={{ click: () => handleMarkerClick(parlour) }}>
                <Popup>
                  <strong>{parlour.name}</strong><br />
                  {parlour.address}<br />
                  Contact: {parlour.contact}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Parlours;
