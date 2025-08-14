const express = require('express');
const router = express.Router();
const Ordermanagements= require("../../models/Order_manager/ordermanagement");

// Test route to check if ordermanagement routes are working
router.get("/test", (req, res) => res.send("ordermanagement routes working"));

router.post("/",(req,res)=>{
    Ordermanagements.create(req.body)
     .then(()=>(res.json({msg:"Order added successfully"}),console.log(req.body)))
     .catch((err)=>res.status(400).json({msg:"Customer adding failed"}));

    
});
router.get("/",(req,res)=>{
    Ordermanagements.find()
     .then((ordermanagements)=>res.json(ordermanagements))
     .catch((err)=>res.status(400).json({msg:"no order found"}));

    
});

router.get("/:id",(req,res)=>{
    Ordermanagements.findById(req.params.id)
     .then((ordermanagements)=>res.json(ordermanagements))
     .catch((err)=>res.status(400).json({msg:"no order found"}));

    
});

router.put("/:id",(req,res)=>{
    Ordermanagements.findByIdAndUpdate(req.params.id,req.body)
     .then(()=>res.json({msg:"Update successfully..."}))
     .catch((err)=>res.status(400).json({msg:"Update failed"}));

    
});
router.delete("/:id",(req,res)=>{
    Ordermanagements.findByIdAndDelete(req.params.id)
     .then(()=>res.json({msg:"Delete successfully..."}))
     .catch((err)=>res.status(400).json({msg:"Delete failed"}));

    
});
router.get('/email/:email', async (req, res) => {
    const email = req.params.email; // Get the email from the request parameters
    try {
        const orders = await Ordermanagements.find({ customerEmail: email });

        return res.status(200).json({
            data: orders
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
    }
});

module.exports = router;
