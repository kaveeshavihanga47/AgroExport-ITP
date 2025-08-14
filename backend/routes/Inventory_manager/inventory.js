const express = require("express");
const router = express.Router();
const inventory = require("../../models/Inventory/inventory");

// Test Route
router.get("/test", (req, res) => res.send("inventory routes working.."));

// Create Inventory
router.post("/", (req, res) => {
  inventory.create(req.body)
    .then(() => res.json({ msg: "inventory add success" }))
    .catch(() => res.status(400).json({ msg: "inventory add fail" }));
});

// Get All Inventories
router.get("/", (req, res) => {
  inventory.find()
    .then((inventories) => res.json(inventories))
    .catch(() => res.status(400).json({ msg: "not found" }));
});

// Get Inventory by Employee_Id
router.get("/:Employee_Id", (req, res) => {
  inventory.findOne({ Employee_Id: req.params.Employee_Id })
    .then((inventory) => res.json(inventory))
    .catch(() => res.status(400).json({ msg: "not found" }));
});

// Update Inventory by Employee_Id
router.put("/:Employee_Id", (req, res) => {
  inventory.findOneAndUpdate({ Employee_Id: req.params.Employee_Id }, req.body, { new: true })
    .then((updatedInventory) => res.json({ msg: "inventory updated success", updatedInventory }))
    .catch(() => res.status(400).json({ msg: "inventory update fail" }));
});

// Delete Inventory by Employee_Id
router.delete("/:Employee_Id", (req, res) => {
  inventory.findOneAndDelete({ Employee_Id: req.params.Employee_Id }) // Using Employee_Id to find the item
    .then(() => res.json({ msg: "inventory deleted success" }))
    .catch(() => res.status(400).json({ msg: "inventory delete fail" }));
});

module.exports = router;
