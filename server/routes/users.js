const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Create a new employee
router.post("/", async (req, res) => {
  try {
    // Extract data from the request body
    const {
      name,
      userName,
      email,
      phNo,
      pswrd,
      dOB,
      gender,
      nationalId,
      address,
    } = req.body;

    // Check if all required fields are provided
    if (!name || !userName || !email || !phNo || !pswrd || !nationalId) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Check if the 'address' property is present
    const userAddress = address || {};

    // Create a new Employee instance with the extracted data
    const newUser = new User({
      name,
      userName,
      email,
      phNo,
      pswrd,
      dOB,
      gender,
      nationalId,
      address: {
        street: userAddress.street || "",
        city: userAddress.city || "",
        state: userAddress.state || "",
        zipCode: userAddress.zipCode || "",
        country: userAddress.country || "",
        addressDesc: userAddress.addressDesc || "",
      },
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle errors
    console.error("Error creating a new Registration:", error);
    res.status(500).json({ error: "Error creating a new Registration" });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      res.status(404).json({ message: "No User found" });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndDelete(userId);

    res.status(204).send("User Deleted");
  } catch (error) {
    res.status(500).json({ error: "Error deleting the User" });
  }
});

//Updatng a category
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    // Check if the table exists
    const existingUser = await Table.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: "user not found" });
    }

    // Update the table
    await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating the user" });
  }
});

// Getting a single category
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the table by ID
    const user = await Table.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the user" });
  }
});

module.exports = router;
