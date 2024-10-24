const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Gallery = require('../models/Gallerymodel');
const archiver = require('archiver'); // Import archiver
const router = express.Router();

// Enable CORS and JSON body parsing
router.use(cors());
router.use(express.json());

// Set up Multer for image uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Galleryimg'); // Store images in 'Galleryimg' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb('Images only!');
    }
  },
});

// Route to add new gallery content
router.post('/gallery', upload.array('images', 5), async (req, res) => {
  const { title, description } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'At least one image is required' });
  }

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const imageUrls = req.files.map(file => `/Galleryimg/${file.filename}`);

  try {
    const newGalleryItem = new Gallery({
      images: imageUrls,
      title,
      description,
    });
    await newGalleryItem.save();
    res.status(201).json(newGalleryItem);
  } catch (error) {
    console.error('Failed to add gallery item:', error);
    res.status(500).json({ message: 'Failed to add gallery item' });
  }
});

// Route to fetch a specific gallery item by id
router.get('/gallery/:id', async (req, res) => {
  const galleryItemId = req.params.id;
  try {
    const galleryItem = await Gallery.findById(galleryItemId);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(galleryItem);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    res.status(500).json({ message: 'Failed to fetch gallery item' });
  }
});
// Route to fetch all gallery items
router.get('/gallery', async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    res.json(galleryItems);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ message: 'Failed to fetch gallery items' });
  }
});

// Route to download multiple images in a zip file
router.get('/download/images/:id', async (req, res) => {
  const galleryItemId = req.params.id;
  try {
    const galleryItem = await Gallery.findById(galleryItemId);
    if (!galleryItem || !galleryItem.images || galleryItem.images.length === 0) {
      return res.status(404).json({ message: 'Gallery item not found or no images available' });
    }

    const zipFileName = `gallery-${galleryItemId}.zip`;
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${zipFileName}`);

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(res);

    // Append each image file to the zip archive
    galleryItem.images.forEach((image) => {
      const filePath = path.join(__dirname, '../Galleryimg', image.split('/').pop());
      archive.file(filePath, { name: path.basename(filePath) });
    });

    archive.finalize();
  } catch (error) {
    console.error('Error downloading images:', error);
    res.status(500).json({ message: 'Failed to download images' });
  }
});

// DELETE route for gallery items
router.delete('/gallery/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: 'Error deleting gallery item' });
  }
});

module.exports = router;
