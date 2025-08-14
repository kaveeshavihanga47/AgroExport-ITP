const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    
    _id:{type:String},
    name:{type:String},
    nic:{type:String},
    contact:{type:String},
    email:{type:String},
    category:{type:String,
        enum:["corn", "pepper", "cashew","coconut" ]

    }
})

SupplierSchema.pre('save', function(next) {
    if (!this._id) {
        this._id = generateCustomId();  // Replace with your custom ID generation logic
    }
    next();
  });
  
  function generateCustomId() {
    // Custom ID generation logic, e.g., a combination of timestamp and a random number
    return 'Sup-' + Math.floor(Math.random() * 10000);
  }

  module.exports = mongoose.model("supplier",SupplierSchema);