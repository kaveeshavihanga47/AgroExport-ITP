const mongoose = require("mongoose")

const DestributorSchema = new mongoose.Schema({

    _id:{type:String},
    nic: {type:String},
    needs: {type:String},
    quantity: {type:Number},
    date_time:{
        type: Date, 
        default: Date.now, // Automatically sets the current date and time
      },
    status:{type:String}
})

DestributorSchema.pre('save', function(next) {
  if (!this._id) {
      this._id = generateCustomId();  // Replace with your custom ID generation logic
  }
  next();
});

function generateCustomId() {
  // Custom ID generation logic, e.g., a combination of timestamp and a random number
  return 'Des-' + Math.floor(Math.random() * 10000);
}
module.exports = mongoose.model("Destributor", DestributorSchema);