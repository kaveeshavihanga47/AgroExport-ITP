const mongoose = require("mongoose");

const CollectingSchema = new mongoose.Schema({
    HarID: {
        type: String,
    },
    farmerNIC: {
        type: String,
        // required: [true, "Farmer NIC is required"],
        
    },
    Name:{
        type:String,
       
    },
    Address:{
        type: String,
       
    },
    CNumber: {
        type: String,
       
        validate: {
          validator: function (v) {
            return /^(?:0(7[0-9]{1}|11)[0-9]{7})$/.test(v);
          },
          message: props => `${props.value} is not a valid Sri Lankan contact number!`
        }
      },
    Category: {
        type: String,
     
    },
    Quantity: {
        type: Number,
        // require: [true, "Quantity is required"],
        min: [0, "Quantity must be a positive number"],
    },

    
    Date: {
        type: Date,
        // required: [true, "Date is required"], 
        validate: {
            validator: function (value) {
                return value <= new Date(); 
            },
            message: "Date cannot be in the future",
        },
        default: Date.now, 
    },

    Time: {
        type: String,
        // required: [true, "Time is required"],
        validate: {
            validator: function (value) {
                // Validate time format (HH:mm)
                return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
            },
            message: "Time must be in the format HH:mm",
        },
    }
    
    
});

// Pre-save hook to auto-generate HarID
CollectingSchema.pre("save", async function (next) {
    if (!this.isNew) {
        return next();
    }

    const latestRecord = await mongoose.model("collecting").findOne().sort({ HarID: -1 });
    
    if (latestRecord && latestRecord.HarID) {
        // Extract the numeric part from the latest HarID and increment it
        const latestID = parseInt(latestRecord.HarID.substring(2)); // Assuming the format is "Hr001"
        const newID = latestID + 1;
        this.HarID = `Hr${newID.toString().padStart(3, "0")}`; // Pad with leading zeros to maintain the "HrXXX" format
    } else {
        this.HarID = "Hr001"; // If no records exist, start with "Hr001"
    }

    next();
});

module.exports = mongoose.model("collecting", CollectingSchema);
