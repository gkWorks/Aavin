require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const homeSliderRoutes = require('./routes/homeSlider');
const homeProductRoutes = require('./routes/homeProduct');
const homeEventRoutes = require('./routes/homeEvent');
const whatNewRoutes = require('./routes/whatNew');
const employNotificationRoutes = require('./routes/employNotification');
const tenderRoutes = require('./routes/tender');
const formRoutes = require('./routes/formRoutes');
const milkRoutes = require('./routes/milk');
const iceCreamRoutes = require('./routes/iceCreamRoutes');
const productRoute = require('./routes/productRoute');
const emailRoutes = require('./routes/emailRoutes');
const About = require("./routes/Aboutroute");
const galleryRoutes = require('./routes/Galleryroute');
const dactivementRoutes = require('./routes/activementroute');
const youtubeLinkRoutes = require('./routes/YoutubeLink'); // Correct route import
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/GalleryImg', express.static(path.join(__dirname, 'Galleryimg')));

//For Email
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Increase the limit for JSON and URL-encoded data
app.use(express.json({ limit: "20mb" })); // Adjust size as necessary (e.g., 10mb)
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use('/api/home-slider', homeSliderRoutes);
app.use('/api/home-product', homeProductRoutes);
app.use('/api/home-event', homeEventRoutes);
app.use('/api/what-new', whatNewRoutes);
app.use('/api/employnotification', employNotificationRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/milk', milkRoutes);
app.use('/api/icecreams', iceCreamRoutes);
app.use('/api/products', productRoute);
app.use('/api', emailRoutes); 
app.use("/api/About", About);
app.use('/api', galleryRoutes);
app.use('/api/dactivement', dactivementRoutes);
app.use('/api', youtubeLinkRoutes); // Make sure this route is correctly handled
// Check the loaded environment variable
console.log('MongoDB URI:', process.env.MONGO_URI); // Debugging line

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
