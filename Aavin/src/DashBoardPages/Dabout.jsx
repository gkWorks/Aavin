import React, { useState, useEffect, useRef } from 'react';
import { AiFillEdit, AiOutlineClose } from 'react-icons/ai';
import { FaUpload } from 'react-icons/fa';

const Dabout = () => {
  const [preamble, setPreamble] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [minister, setMinister] = useState('');
  const [principalSecretary, setPrincipalSecretary] = useState('');
  const [commissioner, setCommissioner] = useState('');
  const [unionDetails, setUnionDetails] = useState({
    dateOfRegistration: '',
    phoneNo: '',
    faxNo: '',
    email: '',
    website: '',
    UnionregistrationNo: '',
    FSSAILicenseNo: '',
    Dated: '',
    BoardOfDirectors: '',
    YearofEstablishment: '',
    TotalCadreStrength: '',
    NoofEmployeesworking: ''
  });
  const [images, setImages] = useState([]); // For newly selected images
  const [fetchedImages, setFetchedImages] = useState([]); // For images fetched from the server
  const fileInputRefs = useRef([]); // Refs to store file input references
  const [isPreambleEditable, setIsPreambleEditable] = useState(false);
  const [isIntroductionEditable, setIsIntroductionEditable] = useState(false);
  const [isMinisterEditable, setIsMinisterEditable] = useState(false);
  const [isPrincipalSecretaryEditable, setIsPrincipalSecretaryEditable] = useState(false);
  const [isCommissionerEditable, setIsCommissionerEditable] = useState(false);
  const [isDateOfRegistrationEditable, setIsDateOfRegistrationEditable] = useState(false);
  const [isphoneNoEditable, setIsisphoneNoEditable] = useState(false);
  const [isFaxNoEditable, setIsFaxNoEditable] = useState(false);
  const [isemailEditable, setIsemailEditable] = useState(false);
  const [isWebsiteEditable, setIsWebsiteEditable] = useState(false);
  const [isUnionRegistrationNoEditable, setIsUnionRegistrationNoEditable] = useState(false);
  const [isFSSAILicenseNoEditable, setIsFSSAILicenseNoEditable] = useState(false);
  const [isDatedEditable, setIsDatedEditable] = useState(false);
  const [isBoardOfDirectorsEditable, setIsBoardOfDirectorsEditable] = useState(false);
  const [isYearofEstablishmentEditable, setIsYearofEstablishmentEditable] = useState(false);
  const [isTotalCadreStrengthEditable, setIsTotalCadreStrengthEditable] = useState(false);
  const [isNoofEmployeesworkingEditable, setIsNoofEmployeesworkingEditable] = useState(false);


  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/About');
        const data = await response.json();
        setPreamble(data.PREAMBLE);
        setIntroduction(data.INTRODUCTION);
        setMinister(data.MINISTER || '');
        setPrincipalSecretary(data.PRINCIPAL_SECRETARY || '');
        setCommissioner(data.COMMISSIONER || '');
        setUnionDetails(data.UNION_ORGANIZATION_DETAILS || {});
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchContent();
  }, []);
 // Fetch initial content and images from the backend
 useEffect(() => {
  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/About/');
      const data = await response.json();
      setFetchedImages(data.IMAGECONTENT || []); // Set images from backend
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  fetchImages();
}, []);

 // Unified function to save or submit content
 const handleContentSubmission = async (isSubmit = false) => {
  const method = isSubmit ? 'POST' : 'PUT'; // Determine method based on action
  const endpoint = isSubmit ? 'submit' : ''; // Set endpoint for submission

  try {
    const responseContent = await fetch(`http://localhost:5000/api/About/${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        PREAMBLE: preamble,
        INTRODUCTION: introduction,
        MINISTER: minister,
        PRINCIPAL_SECRETARY: principalSecretary,
        COMMISSIONER: commissioner,
        UNION_ORGANIZATION_DETAILS: unionDetails,
      }),
    });

    if (!responseContent.ok) {
      throw new Error(isSubmit ? 'Failed to submit content' : 'Failed to update content');
    }

    const result = await responseContent.json();
    console.log(result.message); // Optionally log the success message
    alert(isSubmit ? 'Content submitted successfully!' : 'Content updated successfully!');
  } catch (error) {
    console.error('Error handling content submission:', error);
    alert(isSubmit ? 'Failed to submit content' : 'Failed to update content');
  }
};
  
// Save image to backend
const saveImage = async (index, file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('index', index);

  try {
    const response = await fetch('http://localhost:5000/api/About/images/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    alert('Image uploaded successfully!');
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};


  const handleUnionDetailsChange = (e) => {
    const { name, value } = e.target;
    setUnionDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
// Handle image upload
const handleImageUpload = async (e, index, setImages) => {
  const file = e.target.files[0];
  if (file) {
    try {
      await saveImage(index, file); // Save image to the backend

      // Update image state after successful upload
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = URL.createObjectURL(file); // Create a local preview URL
        return updatedImages;
      });

      e.target.value = ''; // Clear file input for re-selection
    } catch (error) {
      console.error('Error handling image upload:', error);
    }
  }
};

// Trigger file input click on icon click
const handleIconClick = (index) => {
  if (fileInputRefs.current[index]) {
    fileInputRefs.current[index].click();
  }
};

  return (
    <div className="pt-5 px-10 bg-black/5">
     <h2 className="text-3xl font-extrabold mb-6 flex justify-center items-center 
               opacity-0 animate-slide-in-bounce text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600
               transform transition-all duration-700 ease-out hover:scale-110 hover:rotate-6 hover:text-white">
  ABOUT
</h2>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">PREAMBLE</h2>
        <div className="relative ">
          <textarea
            className="w-full p-1 border border-gray-300 rounded-sm mb-1 pr-8 text-sm"
            rows="4"
            value={preamble}
            onChange={(e) => setPreamble(e.target.value)}
            readOnly={!isPreambleEditable}
          />
          <div
            className="absolute top-1 right-1 cursor-pointer text-white bg-black"
            onClick={() => setIsPreambleEditable(!isPreambleEditable)}
          >
            {isPreambleEditable ? <AiOutlineClose size={25} /> : <AiFillEdit size={25} />}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">INTRODUCTION</h2>
        <div className="relative">
          <textarea
            className="w-full p-1 border border-gray-300 rounded-sm mb-1 pr-8 text-sm"
            rows="4"
            value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          readOnly={!isIntroductionEditable}
          />
          <div
            className="absolute top-1 right-1 cursor-pointer text-white bg-black"
            onClick={() => setIsIntroductionEditable(!isIntroductionEditable)}
          >
            {isIntroductionEditable ? <AiOutlineClose size={25} /> : <AiFillEdit size={25} />}
          </div>
        </div>
      </div>
      <div className="pt-10 mx-auto">
      <h2 className="text-2xl font-bold mb-4">DEPARTMENTAL SET UP</h2>
            <div className="flex justify-between mb-6 space-x-20">
              <div className="flex flex-col w-1/3">
              <h2 className="text-lg font-semibold mb-2">Minister:</h2>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border p-2 rounded-sm text-lg"
                  value={minister}
                  onChange={(e) => setMinister(e.target.value)}
                  readOnly={!isMinisterEditable}
                />
                <div
                  className="absolute top-1 right-1 cursor-pointer text-white bg-black"
                  onClick={() => setIsMinisterEditable(!isMinisterEditable)}
                >
                  {isMinisterEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
                </div>
            </div>
        </div> 
        <div className="flex flex-col w-1/3">
              <h2 className="text-lg font-semibold mb-2">Principal Secretary:</h2>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border p-2 rounded-sm text-lg"
                  value={principalSecretary}
                  onChange={(e) => setPrincipalSecretary(e.target.value)}
                  readOnly={!isPrincipalSecretaryEditable}
                />
                <div
                  className="absolute top-1 right-1 cursor-pointer text-white bg-black"
                  onClick={() => setIsPrincipalSecretaryEditable(!isPrincipalSecretaryEditable)}
                >
                  {isPrincipalSecretaryEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
                </div>
            </div>
        </div>
        <div className="flex flex-col w-1/3">
              <h2 className="text-lg font-semibold mb-2">Commissioner:</h2>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border p-2 rounded-sm text-lg"
                  value={commissioner}
                  onChange={(e) => setCommissioner(e.target.value)}
                  readOnly={!isCommissionerEditable}
                />
                <div
                  className="absolute top-1 right-1 cursor-pointer text-white bg-black"
                  onClick={() => setIsCommissionerEditable(!isCommissionerEditable)}
                >
                  {isCommissionerEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
                </div>
            </div>
        </div>
      </div>
          <div className="mb-6 pt-9">
          <h2 className="text-2xl font-bold mb-4">UNION ORGANIZATION DETAILS</h2>
          <div className="flex justify-between mb-6 space-x-16">
          <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
            Date of Registration
          </label>
          <div className="relative">
            <input
              type="text"
              id="dateOfRegistration"
              name="dateOfRegistration"
              value={unionDetails.dateOfRegistration}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isDateOfRegistrationEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsDateOfRegistrationEditable(!isDateOfRegistrationEditable)}
            >
              {isDateOfRegistrationEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
           Phone No:
          </label>
          <div className="relative">
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={unionDetails.phoneNo}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isphoneNoEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsisphoneNoEditable(!isphoneNoEditable)}
            >
              {isphoneNoEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
            Fax No:
          </label>
          <div className="relative">
            <input
              type="text"
              id="faxNo"
              name="faxNo"
              value={unionDetails.faxNo}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isFaxNoEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsFaxNoEditable(!isFaxNoEditable)}
            >
              {isFaxNoEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
           Email:
          </label>
          <div className="relative">
            <input
              type="text"
              id="email"
              name="email"
              value={unionDetails.email}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isemailEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsemailEditable(!isemailEditable)}
            >
              {isemailEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-6 space-x-16">
          <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
            Website: 
          </label>
          <div className="relative">
            <input
              type="text"
              id="website"
              name="website"
              value={unionDetails.website}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isWebsiteEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsWebsiteEditable(!isWebsiteEditable)}
            >
              {isWebsiteEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
           Union Registration No: 
          </label>
          <div className="relative">
            <input
              type="text"
              id="UnionregistrationNo"
              name="UnionregistrationNo"
              value={unionDetails.UnionregistrationNo}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isUnionRegistrationNoEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsUnionRegistrationNoEditable(!isUnionRegistrationNoEditable)}
            >
              {isUnionRegistrationNoEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
            FSSAI License No: 
          </label>
          <div className="relative">
            <input
              type="text"
              id="FSSAILicenseNo"
              name="FSSAILicenseNo"
              value={unionDetails.FSSAILicenseNo}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isFSSAILicenseNoEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsFSSAILicenseNoEditable(!isFSSAILicenseNoEditable)}
            >
              {isFSSAILicenseNoEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
            Dated: 
          </label>
          <div className="relative">
            <input
              type="text"
              id="Dated"
              name="Dated"
              value={unionDetails.Dated}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isDatedEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsDatedEditable(!isDatedEditable)}
            >
              {isDatedEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-6 space-x-16">
          <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
           Board of Directors: 
          </label>
          <div className="relative">
            <input
              type="text"
              id="BoardOfDirectors"
              name="BoardOfDirectors"
              value={unionDetails.BoardOfDirectors}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isBoardOfDirectorsEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsBoardOfDirectorsEditable(!isBoardOfDirectorsEditable)}
            >
              {isBoardOfDirectorsEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
           Year of Establishment: 
          </label>
          <div className="relative">
            <input
              type="text"
              id="YearofEstablishment"
              name="YearofEstablishment"
              value={unionDetails.YearofEstablishment}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isYearofEstablishmentEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsYearofEstablishmentEditable(!isYearofEstablishmentEditable)}
            >
              {isYearofEstablishmentEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 w-1/3">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
            Total Cadre Strength: 
          </label>
          <div className="relative">
            <input
              type="text"
              id="TotalCadreStrength"
              name="TotalCadreStrength"
              value={unionDetails.TotalCadreStrength}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isTotalCadreStrengthEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsTotalCadreStrengthEditable(!isTotalCadreStrengthEditable)}
            >
              {isTotalCadreStrengthEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 w-1/3 pb-10">
          <label htmlFor="dateOfRegistration" className="font-semibold mb-2">
          No of Employees working: 
          </label>
          <div className="relative">
            <input
              type="text"
              id="NoofEmployeesworking"
              name="NoofEmployeesworking"
              value={unionDetails.NoofEmployeesworking}
              onChange={handleUnionDetailsChange}
              className="p-2 border rounded-sm w-full text-lg"
              readOnly={!isNoofEmployeesworkingEditable}
            />
            <div
              className="absolute top-1 right-1 cursor-pointer text-white bg-black"
              onClick={() => setIsNoofEmployeesworkingEditable(!isNoofEmployeesworkingEditable)}
            >
              {isNoofEmployeesworkingEditable ? <AiOutlineClose size={20} /> : <AiFillEdit size={20} />}
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
      <div className='flex items-end justify-end'>
      <button
          className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg 
                    border border-white whitespace-normal shadow-lg transition-all duration-300 ease-in-out
                    transform hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600
                    hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-black
                    animate-pulse hover:animate-none hover:shadow-xl"
          onClick={() => handleContentSubmission(true)} // Submit New Content
        >
          Save All Changes
        </button>
      </div>
      <div className="pt-10 mx-auto pb-16">
        <h2 className="text-2xl font-bold mb-4 pb-5 ">Upload Images</h2>

        <div className="grid grid-cols-4 gap-4">
          {Array(4).fill(null).map((_, index) => (
            <div
              key={index}
              className="group bg-black/15 p-1 rounded-md w-full h-48 relative flex justify-center items-center cursor-pointer"
            >
              {/* Clickable image upload area */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
                className="absolute inset-0 opacity-0"
                ref={(el) => (fileInputRefs.current[index] = el)} // Store reference
              />

              {/* Display selected image preview or fetched image */}
              {images[index] ? (
                <img
                  src={URL.createObjectURL(images[index])}
                  alt={`Uploaded Preview ${index}`}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
                />
              ) : fetchedImages[index] ? (
                <img
                  src={fetchedImages[index]}
                  alt={`Fetched Image ${index}`}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
                />
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <FaUpload className="text-white text-4xl mb-2" /> {/* Upload icon */}
                  <span className="text-white">Upload Image</span>
                </div>
              )}

              {/* Upload Icon Overlay on hover */}
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => handleIconClick(index)}
              >
                <FaUpload className="text-white text-4xl mb-2" /> {/* Upload icon */}
                <span className="text-white">Upload New Image</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
};

export default Dabout;
