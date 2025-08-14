const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema({

    _id: {
        type:String
    },
    DOID:{
       type:String,
    },

    FarmerNIC:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },

    address:{
        type:String,
        required:true,
    },

    number:{
        type:Number,
        required:true,
    },


    category:{
        type:String,
        required:true,
    },
    type:{
        type:String
    },
    amount:{
        type:Number,
        required:true,
    },
    Date:{
        type:Date,
        required:true,
    }
    
         
});

distributionSchema.pre('save', function(next) {
    if (!this._id) {
        this._id = generateCustomId();  // Replace with your custom ID generation logic
    }
    next();
  });
  
  function generateCustomId() {
    // Custom ID generation logic, e.g., a combination of timestamp and a random number
    return 'MAN-' + Math.floor(Math.random() * 10000);
  }

module.exports = Distribution =mongoose.model("distribution", distributionSchema);