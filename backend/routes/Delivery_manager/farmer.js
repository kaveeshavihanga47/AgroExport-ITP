const express = require("express");
const router = express.Router();
const Farmer = require("../../models/Delivery_manager/FarmerPay.js");

// Test route
router.get("/test", (req, res) => res.send("Farmer routes working."));

// POST: Create farmer
router.post("/", (req, res) => {
    Farmer.create(req.body) // Change from employee to Farmer
        .then(() => res.json({ msg: "Farmer created successfully!" }))
        .catch(() => res.status(400).json({ msg: "Farmer not created!" }));
});

// GET: Retrieve all farmers
router.get("/", async (req, res) => {
    try {
        const farmers = await Farmer.find();  // Fetch all farmers
        res.json(farmers);
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving farmers" });
    }
});

router.get("/:process_id", async (req, res) => {
    try {
        const farmer = await Farmer.findOne({ process_id: req.params.process_id });
        if (!farmer) {
            return res.status(404).json({ msg: "Farmer not found" });
        }
        res.json(farmer);
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving farmer" });
    }
});


router.put("/:process_id", async (req, res) => {
    try {
        const updatedFarmer = await Farmer.findOneAndUpdate(
            { process_id: req.params.process_id },
            req.body,
            { new: true } // Return the updated document
        );
        if (!updatedFarmer) {
            return res.status(404).json({ msg: "Farmer not found" });
        }
        res.json({ msg: "Farmer updated successfully!", updatedFarmer });
    } catch (error) {
        res.status(400).json({ msg: "Update failed", error });
    }
});


// DELETE: Delete farmer by process_id
router.delete("/:process_id", async (req, res) => {
    try {
        const farmer = await Farmer.findOneAndDelete({ process_id: req.params.process_id });
        if (!farmer) {
            return res.status(404).json({ msg: "Farmer not found!" });
        }
        res.json({ msg: "Farmer deleted successfully!" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting farmer" });
    }
});


module.exports = router;
