const express = require("express");
const router = express.Router();
const Supplier = require("../../models/Supplier_manager/SupplierModel.js")

router.post("/", (req, res) => {
    console.log("Request Body:", req.body); // Log the request body for debugging
  
    Supplier.create(req.body)
      .then(() => res.json({ msg: " successful" }))
      .catch((err) => {
        console.error("Error :", err);
        res.status(400).json({ msg: "failed", error: err.message }); // Return error message
      });
  });


router.get("/", (req, res) => {
    Supplier.find()
      .then((payments) => res.json(payments))
      .catch((err) => {
        console.error("Error fetching Supplier:", err);
        res.status(400).json({ msg: "Supplier not found", error: err.message }); // Return error message
      });
  });

router.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await Supplier.findById(id);
        return res.status(200).json({
            data: user
        })
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

router.put("/:id", (req, res) => {
    Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) // Use options for better results
      .then((updatedDestributor) => {
        if (!updatedDestributor) {
          return res.status(404).json({ msg: "supplier not found" });
        }
        res.json({ msg: "Supplier updated successfully" });
      })
      .catch((err) => {
        console.error("Error updating destribute:", err);
        res.status(400).json({ msg: "Cannot update this supplier", error: err.message }); // Return error message
      });
  });

router.delete("/:id", (req, res) => {
    Supplier.findByIdAndDelete(req.params.id)
      .then((deletedDestribute) => {
        if (!deletedDestribute) {
          return res.status(404).json({ msg: "supplier not found" });
        }
        res.json({ msg: "Supplier deleted successfully" });
      })
      .catch((err) => {
        console.error("Error deleting Supplier:", err);
        res.status(400).json({ msg: "Cannot delete this supplier", error: err.message }); // Return error message
      });
  });
  
  module.exports = router;