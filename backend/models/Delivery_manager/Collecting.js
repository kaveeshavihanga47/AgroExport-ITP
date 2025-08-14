const mongoose = require('mongoose');

// Define the Collecting schema
const collectingSchema = new mongoose.Schema({
    _id:{type:String},
    TrackingNo: { type: String, required: true },
    farmerNIC: { type: String, required: true },
    Name: { type: String, required: true },
    Address: [{ // Change made here to indicate an array of addresses
        warehouse: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
    }],
    CNumber: { type: String, required: true },
    Category: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    HarID: { type: String, required: true },
    DeliverAction: { type: String, required: true },
}, { collection: 'collectings2' });


collectingSchema.pre('save', function(next) {
    if (!this._id) {
        this._id = generateCustomId();  // Replace with your custom ID generation logic
    }
    next();
  });
  
  function generateCustomId() {
    // Custom ID generation logic, e.g., a combination of timestamp and a random number
    return 'Col-' + Math.floor(Math.random() * 10000);
  }
  
const Collecting = mongoose.model('collectings2', collectingSchema);

module.exports = Collecting;
