const mongoose = require('mongoose');

// Define the schema for About content
const AboutSchema = new mongoose.Schema({
  PREAMBLE: {
    type: String,
  },
  INTRODUCTION: {
    type: String,
  },
  MINISTER: {
    type: String,
  },
  PRINCIPAL_SECRETARY: {
    type: String,
  },
  COMMISSIONER: {
    type: String,
  },
  UNION_ORGANIZATION_DETAILS: {
    dateOfRegistration: {
      type: String,
    }, 
    phoneNo: {
      type: String,
    },
    faxNo: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    UnionregistrationNo: {
      type: String,
    },
    FSSAILicenseNo: {
      type: String,
    },
    Dated: {
      type: String,
    },
    BoardOfDirectors: {
      type: String,
    },
    YearofEstablishment: {
      type: String,
    },
    TotalCadreStrength: {
      type: String,
    },
    NoofEmployeesworking: {
      type: String,
    },
  },
  IMAGECONTENT: {
    type: [String], // Array of strings to hold image URLs
  },
});

// Create the model from the schema
const About = mongoose.model('AboutContent', AboutSchema);

module.exports = About;
