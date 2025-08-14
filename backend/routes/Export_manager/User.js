// backend/routes/User.js
const express = require("express");
const router = express.Router();
const User = require("../../models/Export_manager/User");

// POST route to create a new user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // Validation check
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // In production, make sure to hash passwords before storing
    });

    await newUser.save();
    res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to create user" });
  }
});

// GET route to fetch all users
// GET route to fetch user by ID
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  });
  

module.exports = router;
