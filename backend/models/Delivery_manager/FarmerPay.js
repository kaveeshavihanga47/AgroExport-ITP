const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
    process_id:{
        type:String,
        
    },
    nic:{
        type:String,

    },
    amount:{
        type:String
    },
    payment_method:{
        type:String,
        
    },
    date_time:{
        type:String,
        
    },
    payment_status:{
        type:String,
       
    }
});


module.exports = mongoose.model("FarmerPay",FarmerSchema)