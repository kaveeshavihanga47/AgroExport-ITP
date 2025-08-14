const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  Employee_Id: {
    type: String,
    required: true,
  },
  transfer_id: {
    type: String,
    required: true,
  },
  material_id: {
    type: String,
    required: true,
  },
  material_type: {
    type: String,
    required: true,
  },
  warehouse: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number, // Changed from String to Number since quantity should likely be numeric
    required: true,
  },
  transfer_date_time: {
    type: Date,
    required: true,
  },
  received_by: {
    type: String, // If this represents a person, keep it as String
    required: true,
  },
  checked_by: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);