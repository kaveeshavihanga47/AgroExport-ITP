const express = require("express");
const router = express.Router();
const Destributor = require("../../models/Financial_manager/DestributorModel.js");
const { model } = require("mongoose");


router.post("/", (req, res) => {
    console.log("Request Body:", req.body); // Log the request body for debugging
  
    Destributor.create(req.body)
      .then(() => res.json({ msg: " successful" }))
      .catch((err) => {
        console.error("Error :", err);
        res.status(400).json({ msg: "failed", error: err.message }); // Return error message
      });
  });

router.get("/", (req, res) => {
    Destributor.find()
      .then((payments) => res.json(payments))
      .catch((err) => {
        console.error("Error fetching destributor:", err);
        res.status(400).json({ msg: "Destributor not found", error: err.message }); // Return error message
      });
  });


  router.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await Destributor.findById(id);
        return res.status(200).json({
            data: user
        })
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

router.put("/:id", (req, res) => {
    Destributor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) // Use options for better results
      .then((updatedDestributor) => {
        if (!updatedDestributor) {
          return res.status(404).json({ msg: "Payment not found" });
        }
        res.json({ msg: "Destribute updated successfully" });
      })
      .catch((err) => {
        console.error("Error updating destribute:", err);
        res.status(400).json({ msg: "Cannot update this destribute", error: err.message }); // Return error message
      });
  });

router.delete("/:id", (req, res) => {
    Destributor.findByIdAndDelete(req.params.id)
      .then((deletedDestribute) => {
        if (!deletedDestribute) {
          return res.status(404).json({ msg: "Payment not found" });
        }
        res.json({ msg: "Destribute deleted successfully" });
      })
      .catch((err) => {
        console.error("Error deleting destribute:", err);
        res.status(400).json({ msg: "Cannot delete this destribute", error: err.message }); // Return error message
      });
  });
  
module.exports = router;