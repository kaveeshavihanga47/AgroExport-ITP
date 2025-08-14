const express = require("express");

const router = express.Router();

const Collecting = require("../../models/Collecting_manager/collecting.js");

//test
router.get("/test",(req,res)=>res.send("route working"))

router.post("/",(req,res)=>{
    Collecting.create(req.body)
    .then( ()=>res.json({msg:"Details added succesfully "}))
    .catch(()=>res.status(400).json({msg:"Details adding failed"}));
});

router.get("/",(req,res)=>{
    Collecting.find() 
    .then((collecting)=>res.json(collecting))
    .catch(()=>res.status(400).json({msg:"No details found"}));
});

router.get("/:id",(req,res)=>{
    Collecting.findById(req.params.id)
    .then((collecting)=>res.json(collecting))
    .catch(()=>res.status(400).json({msg:"cannot find"}));
});

router.put("/:id",(req,res)=>{
    Collecting.findByIdAndUpdate(req.params.id,req.body).then(()=>
        res.json({msg:"update succesfully"})).catch(()=>res.status(400).json({msg: "update failed"}));
});

router.delete("/:id",(req,res)=>{
    Collecting.findByIdAndDelete(req.params.id)
    .then(()=>res.json({msg:"delete succesfully"}))
    .catch(()=>res.status(400).json({msg:"cannot be delete"}));
});

module.exports = router;