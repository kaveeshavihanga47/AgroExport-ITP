const express = require("express");
const router = express.Router();
const Financial = require("../../models/Financial_manager/financial"); // Ensure the correct model name is used

// Test route
router.get("/test", (req, res) => res.send("Financial routes working.."));

// Create a new financial record
router.post("/", (req, res) => {
  console.log("Request Body:", req.body); // Log the request body for debugging

  Financial.create(req.body)
    .then(() => res.json({ msg: "Payment successful" }))
    .catch((err) => {
      console.error("Error creating payment:", err);
      res.status(400).json({ msg: "Payment failed", error: err.message }); // Return error message
    });
});

// Get all financial records
router.get("/", (req, res) => {
  Financial.find()
    .then((payments) => res.json(payments))
    .catch((err) => {
      console.error("Error fetching payments:", err);
      res.status(400).json({ msg: "Payments not found", error: err.message }); // Return error message
    });
});

// Get a specific financial record by ID
router.get("/:id", (req, res) => {
  Financial.findById(req.params.id)
    .then((payment) => {
      if (!payment) {
        return res.status(404).json({ msg: "Payment not found" });
      }
      res.json(payment);
    })
    .catch((err) => {
      console.error("Error fetching payment:", err);
      res.status(400).json({ msg: "Cannot find this payment", error: err.message }); // Return error message
    });
});

// Update a financial record by ID
router.put("/:id", (req, res) => {
  Financial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) // Use options for better results
    .then((updatedPayment) => {
      if (!updatedPayment) {
        return res.status(404).json({ msg: "Payment not found" });
      }
      res.json({ msg: "Payment updated successfully", payment: updatedPayment });
    })
    .catch((err) => {
      console.error("Error updating payment:", err);
      res.status(400).json({ msg: "Cannot update this payment", error: err.message }); // Return error message
    });
});

// Delete a financial record by ID
router.delete("/:id", (req, res) => {
  Financial.findByIdAndDelete(req.params.id)
    .then((deletedPayment) => {
      if (!deletedPayment) {
        return res.status(404).json({ msg: "Payment not found" });
      }
      res.json({ msg: "Payment deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting payment:", err);
      res.status(400).json({ msg: "Cannot delete this payment", error: err.message }); // Return error message
    });
});

module.exports = router;



