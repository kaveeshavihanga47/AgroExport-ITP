const mongoose = require("mongoose");

const PaymentReturnSchema = new mongoose.Schema({
    _id :{
        type:String,
    },
    order_id:{
        type:String
    },
    by_whom:{
        type:String,
    },
    amount:{
        type:Number
    },
    return_back:{
        type:String
    }
})

PaymentReturnSchema.pre('save', function(next) {
    if (!this._id) {
        this._id = generateCustomId();  // Replace with your custom ID generation logic
    }
    next();
  });
  
  function generateCustomId() {
    // Custom ID generation logic, e.g., a combination of timestamp and a random number
    return 'PR-' + Math.floor(Math.random() * 10000);
  }

  
module.exports = mongoose.model("Paymentreturn", PaymentReturnSchema);