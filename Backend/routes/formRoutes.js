const express = require('express');
const multer = require('multer');
const Form = require('../models/Form');
const path = require('path');
const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/forms'); // Save uploaded files to 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`); // Use unique filename
    }
});

const upload = multer({ storage });

// POST route to upload form data
router.post('/', upload.single('pdfFile'), async (req, res) => {
    console.log('Form upload route hit'); // Check if the route is called
    try {
        const { name } = req.body;
        const pdfFile = `/uploads/${req.file.filename}`;

        const newForm = new Form({
            name,
            pdfFile
        });

        await newForm.save();
        res.status(200).json(newForm);
    } catch (error) {
        console.error('Error uploading form:', error);
        res.status(500).json({ error: 'Failed to upload form' });
    }
});

// GET route to fetch all forms
router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error fetching forms:', error);
        res.status(500).json({ error: 'Failed to fetch forms' });
    }
});

// DELETE route to remove a form by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const form = await Form.findByIdAndDelete(id);

        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ error: 'Failed to delete form' });
    }
});

module.exports = router;
