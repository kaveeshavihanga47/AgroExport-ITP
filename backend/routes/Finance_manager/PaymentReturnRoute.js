const express = require("express");
const router = express.Router();
const PaymentReturn = require("../../models/Financial_manager/PaymentReturn.js")

router.post("/", (req, res) => {
    console.log("Request Body:", req.body); // Log the request body for debugging
  
    PaymentReturn.create(req.body)
      .then(() => res.json({ msg: " successful" }))
      .catch((err) => {
        console.error("Error :", err);
        res.status(400).json({ msg: "failed", error: err.message }); // Return error message
      });
  });

router.get("/", (req, res) => {
    PaymentReturn.find()
      .then((payments) => res.json(payments))
      .catch((err) => {
        console.error("Error fetching payment:", err);
        res.status(400).json({ msg: "payment not found", error: err.message }); // Return error message
      });
  });

router.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await PaymentReturn.findById(id);
        return res.status(200).json({
            data: user
        })
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

router.put("/:id", (req, res) => {
    PaymentReturn.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) // Use options for better results
      .then((updatedDestributor) => {
        if (!updatedDestributor) {
          return res.status(404).json({ msg: "payment not found" });
        }
        res.json({ msg: "payemnt updated successfully" });
      })
      .catch((err) => {
        console.error("Error updating payment:", err);
        res.status(400).json({ msg: "Cannot update this payment", error: err.message }); // Return error message
      });
  });


router.delete("/:id", (req, res) => {
    PaymentReturn.findByIdAndDelete(req.params.id)
      .then((deletedDestribute) => {
        if (!deletedDestribute) {
          return res.status(404).json({ msg: "payment not found" });
        }
        res.json({ msg: "payment deleted successfully" });
      })
      .catch((err) => {
        console.error("Error deleting payment:", err);
        res.status(400).json({ msg: "Cannot delete this payment", error: err.message }); // Return error message
      });
  });
  

module.exports = router;