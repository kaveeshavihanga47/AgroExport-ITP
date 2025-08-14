const mongoose = require("mongoose");

const financialSchema = new mongoose.Schema({
  _id: {
    type:String,
  },
  payment_id: {
    type: String,
    
  },
  process_id: {
    type: String,
   
  },
  to_whom: {
    type: String,
    
  },
  amount: {
    type: Number,
    
  },
  payment_method: {
    type: String,
    
  },
  note: {
    type: String,
   
  },
  date_time: {
    type: Date, 
   
    default: Date.now, // Automatically sets the current date and time
  },
  approved_by: {
    type: String,
    default:"pending"
  },
  payment_status: {
    type: String,
   
    
  },
});

financialSchema.pre('save', function(next) {
  if (!this._id) {
      this._id = generateCustomId();  // Replace with your custom ID generation logic
  }
  next();
});

function generateCustomId() {
  // Custom ID generation logic, e.g., a combination of timestamp and a random number
  return 'DEL-' + Math.floor(Math.random() * 10000);
}

// Model export
module.exports = mongoose.model("Financial", financialSchema);
