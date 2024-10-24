const express = require('express');
const multer = require('multer');
const router = express.Router();
const About = require('../models/Aboutmodel');
const path = require('path');
const fs = require('fs');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/aboutpageImg'); // Directory for saving images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Filename with timestamp
  },
});

const upload = multer({ storage });

// Route to handle PUT request to update content
router.put('/', async (req, res) => { 
  const { PREAMBLE, INTRODUCTION, MINISTER, PRINCIPAL_SECRETARY, COMMISSIONER, UNION_ORGANIZATION_DETAILS, IMAGECONTENT } = req.body;

  try {
    const updatedAbout = await About.findOneAndUpdate(
      {}, // Assuming there's only one About document
      {
        PREAMBLE,
        INTRODUCTION,
        MINISTER,
        PRINCIPAL_SECRETARY,
        COMMISSIONER,
        UNION_ORGANIZATION_DETAILS,
        IMAGECONTENT,
      },
      { new: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content updated successfully!', updatedAbout });
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error });
  }
});

// Route to handle POST request to save or update content
router.post('/submit', async (req, res) => {
  const { PREAMBLE, INTRODUCTION, MINISTER, PRINCIPAL_SECRETARY, COMMISSIONER, UNION_ORGANIZATION_DETAILS } = req.body;

  try {
    const existingContent = await About.findOne();

    if (existingContent) {
      existingContent.PREAMBLE = PREAMBLE;
      existingContent.INTRODUCTION = INTRODUCTION;
      existingContent.MINISTER = MINISTER;
      existingContent.PRINCIPAL_SECRETARY = PRINCIPAL_SECRETARY;
      existingContent.COMMISSIONER = COMMISSIONER;
      existingContent.UNION_ORGANIZATION_DETAILS = UNION_ORGANIZATION_DETAILS;

      await existingContent.save();
      return res.status(200).json({ message: 'Content updated successfully!', existingContent });
    } else {
      const newAbout = new About({
        PREAMBLE,
        INTRODUCTION,
        MINISTER,
        PRINCIPAL_SECRETARY,
        COMMISSIONER,
        UNION_ORGANIZATION_DETAILS,
        IMAGECONTENT: [] // Initialize with an empty array for images
      });

      await newAbout.save();
      return res.status(201).json({ message: 'Content saved successfully!', newAbout });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error saving content', error });
  }
});

// Route to handle image upload for a specific index
router.post('/images/upload', upload.single('image'), async (req, res) => {
  const { index } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  try {
    const imageUrl = `http://localhost:5000/uploads/aboutpageImg/${req.file.filename}`;
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({ message: 'Content not found' });
    }

    while (about.IMAGECONTENT.length <= index) {
      about.IMAGECONTENT.push(null); // Fill missing indexes
    }

    about.IMAGECONTENT[index] = imageUrl;
    await about.save();

    await deleteUnusedImages(); // Clean up after image upload
    res.status(200).json({ message: 'Image uploaded successfully', about });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading or updating image', error });
  }
});
// Helper function to delete unused images
const deleteUnusedImages = async () => {
  try {
    const about = await About.findOne();
    if (!about) return;

    const storedImages = about.IMAGECONTENT || [];

    // Read all files in the uploads folder
    const files = fs.readdirSync(path.join(__dirname, '..', 'uploads','aboutpageImg'));

    // Delete files that are not in IMAGECONTENT
    files.forEach(file => {
      const filePath = path.join(__dirname, '..', 'uploads', 'aboutpageImg', file);
      const fileUrl = `http://localhost:5000/uploads/aboutpageImg/${file}`;

      if (!storedImages.includes(fileUrl)) {
        fs.unlinkSync(filePath); // Delete file
      }
    });
  } catch (error) {
    console.error('Error deleting unused images:', error);
  }
};
// Route to handle PUT request to update image content
router.put('/images/:index', upload.single('image'), async (req, res) => {
  const { index } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (index >= 0 && index < about.IMAGECONTENT.length) {
      const previousImageUrl = about.IMAGECONTENT[index];
      const previousImageName = path.basename(previousImageUrl);
      const previousImagePath = path.join(__dirname, '..', 'uploads', previousImageName);

      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath); // Remove the previous image file
      }

      const newImageUrl = `http://localhost:5000/uploads/aboutpageImg/${req.file.filename}`;
      about.IMAGECONTENT[index] = newImageUrl;
      await about.save();

      // Clean up unused images after the update
      await deleteUnusedImages();

      return res.status(200).json({ message: 'Image updated successfully!', about });
    } else {
      return res.status(400).json({ message: 'Invalid index' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating image', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error });
  }
});



module.exports = router;
