const express = require("express");
const router = express.Router();
const employee = require("../models/employee");

// Test route
router.get("/test", (req, res) => res.send("Employee routes working."));

// POST: Create employee
router.post("/", (req, res) => {
    employee.create(req.body)
        .then(() => res.json({ msg: "Employee created successfully!" }))
        .catch(() => res.status(400).json({ msg: "Employee not created!" }));
});

// GET: Retrieve all employees
router.get("/", async (req, res) => {
    try {
        const employees = await employee.find();  // Fetch all employees
        res.json(employees);
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving employees" });
    }
});

router.put("/:id", (req, res) => {
    employee.findByIdAndUpdate(req.params.id, req.body).then(() =>
      res
        .json({ msg: "Update succesfully" })
        .catch(() => res.status(400).json({ msg: "Update faild" }))
    );
  });
  
  router.delete("/:id", (req, res) => {
    employee.findByIdAndDelete(req.params.id)
      .then((employee) => {
        if (!employee) {
          return res.status(404).json({ msg: "Employee not found" });
        }
        res.status(200).json({ msg: "Deleted successfully" });
      })
      .catch((err) =>
        res.status(400).json({ msg: "Error deleting employee", error: err })
      );
  });

module.exports = router;
