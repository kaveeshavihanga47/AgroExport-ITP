// backend/routes/exports.js
const express = require("express");
const router = express.Router();
const Export = require("../../models/Export_manager/export"); // Ensure the path is correct

// Test route
router.get("/test", (req, res) => res.send("Export routes working"));

// Create a new export
router.post("/", async (req, res) => {
  try {
    const newExport = new Export(req.body);
    await newExport.save();
    res.status(201).json({ msg: "Export added successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Export adding failed", error: error.message });
  }
});

// Get all exports
router.get("/", async (req, res) => {
  try {
    const exports = await Export.find();
    res.json(exports);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "No exports found", error: error.message });
  }
});

// Get export by ID
router.get("/:id", async (req, res) => {
  try {
    const exportData = await Export.findById(req.params.id);
    if (!exportData) return res.status(404).json({ msg: "Export not found" });
    res.json(exportData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Cannot find this export", error: error.message });
  }
});

// Update export by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedExport = await Export.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExport) return res.status(404).json({ msg: "Export not found" });
    res.json({ msg: "Update successful", export: updatedExport });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Update failed", error: error.message });
  }
});

// Delete export by ID
// Delete export by ID
// Delete export by ID
// Delete export by ID
// Delete export by ID
router.delete("/:id", async (req, res) => {
  try {
      const deletedExport = await Export.findByIdAndDelete(req.params.id);
      if (!deletedExport) {
          return res.status(404).json({ msg: "Export not found" });
      }
      res.json({ msg: "Export deleted successfully" });
  } catch (error) {
      console.error("Deletion error:", error);
      res.status(500).json({ msg: "Deletion failed", error: error.message });
  }
});

// Update export by ID
router.put("/:id", async (req, res) => {
  try {
      const updatedExport = await Export.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedExport) return res.status(404).json({ msg: "Export not found" });
      res.json({ msg: "Update successful", export: updatedExport });
  } catch (error) {
      console.error(error);
      res.status(400).json({ msg: "Update failed", error: error.message });
  }
});



module.exports = router;
