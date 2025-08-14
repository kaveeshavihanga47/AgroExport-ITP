// backend/models/OngoingOrders.js
const mongoose = require("mongoose");

const ongoingOrderSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  OrderID: {
    type: String,
    required: true,
  },
  Quantity: {
    type: String,
    required: true,
  },
  Item: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    default: "shipped",
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("OngoingOrder", ongoingOrderSchema);
