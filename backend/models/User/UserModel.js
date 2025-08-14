const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    
  },
  name: {
      type:String
  },
  nic:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  role: {
    type: String,
    enum: ["Inventory Manager", "Financial Manager", "Delivery Manager", 
      "Export Manager", "Order Manager","Collection Manager", "Distributor Manager", "Supplier Manager", "Customer"]
  },
});

UserSchema.pre('save', function(next) {
  if (!this._id) {
      this._id = generateCustomId();  // Replace with your custom ID generation logic
  }
  next();
});

function generateCustomId() {
  // Custom ID generation logic, e.g., a combination of timestamp and a random number
  return 'MAN-' + Math.floor(Math.random() * 10000);
}

// Model export
module.exports = mongoose.model("Users", UserSchema);
