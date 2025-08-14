// backend/models/export.js
const mongoose = require("mongoose");

const exportSchema = new mongoose.Schema({
  customerID: { type: String, required: true },
  orderID: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  item: { type: String, required: true },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  address: { type: String, required: true },
  exportCost: { type: Number, required: true, min: 0 },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Export", exportSchema);
