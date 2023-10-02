const mongoose = require('mongoose');

// Customer Schema
const customerSchema = mongoose.Schema({
  firstname: { type: String, required: true }, // Require first name
  lastname: { type: String, required: true }, // Require last name
  phone: { type: String, unique: true }, // Unique phone number
  email: { type: String, unique: true }, // Unique email address
  address: { type: String }, // Add customer address
  city: { type: String }, // Add city information
  state: { type: String }, // Add state information
  postalCode: { type: String }, // Add postal code
  country: { type: String }, // Add country
  createdAt: { type: Date, default: Date.now }, // Add creation date
  updatedAt: { type: Date, default: Date.now } // Add last update date
});

// Define and export
module.exports = mongoose.model('Customer', customerSchema);
