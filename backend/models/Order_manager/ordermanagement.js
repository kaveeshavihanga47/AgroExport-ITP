const mongoose = require("mongoose");

const ordermanagementSchema = new mongoose.Schema({
    orderID: {
        type: String,
        
        unique: true,
        trim: true,  
    },
    customerID: {
        type: String,
        
        trim: true,
    },

    customerEmail:{
        type: String,
    },
    amount: {
        type: Number,
        min: 0, 
        
    },
    shippingfee: {
        type: Number,
        
        min: 0, 
    },
    totalprice: {
        type: Number,
       
        min: 0,
    
    },

    status: {
        type: String,
        enum: ['pending', 'order accepted', 'delivery successful', 'delivered', 'cancelled','getItems',
            'processing', 'packaged', 'exported'
        ],
        default: 'pending'
    }
});

module.exports = mongoose.model("Ordermanagement", ordermanagementSchema);
