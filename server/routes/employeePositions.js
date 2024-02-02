const express = require("express");
const EmployeePosition = require("../models/employeePositionModel");

const router = express.Router();

// Gettng the categories
router.get("/", async (req, res) => {
  try {
    const employeePositions = await EmployeePosition.find();

    if (!employeePositions || employeePositions.length === 0) {
      res.status(404).json({ message: "No Position foe Employee found" });
    } else {
      res.status(200).json(employeePositions);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// post new category

router.post("/", async (req, res) => {
  try {
    const newEmployeePosition = new EmployeePosition(req.body);

    if (!newEmployeePosition.name) {
      return res.status(400).json({ error: "Name is required field" });
    }

    const savedEmployeePosition = await newEmployeePosition.save();

    res.status(201).json(savedEmployeePosition);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating a new position for Employee" });
  }
});

// Deletng a category
router.delete("/:Id", async (req, res) => {
  try {
    const employeePositionID = req.params.Id;
    const existingEmployeePosition = await EmployeePosition.findById(
      employeePositionID
    );

    if (!existingEmployeePosition) {
      return res.status(404).json({ error: "Position for Employee not found" });
    }

    await EmployeePosition.findByIdAndDelete(employeePositionID);

    res.status(204).send("Position for Employee Deleted");
  } catch (error) {
    res.status(500).json({ error: "Error deleting the Employee position" });
  }
});

//Updatng a category
router.put("/:Id", async (req, res) => {
  try {
    const employeePositionID = req.params.Id;
    const updateData = req.body;

    // Check if the table exists
    const existingEmployeePosition = await Table.findById(employeePositionID);

    if (!existingEmployeePosition) {
      return res.status(404).json({ error: "Employee Position not found" });
    }

    // Update the table
    await EmployeePosition.findByIdAndUpdate(employeePositionID, updateData, {
      new: true,
    });

    res.status(200).json({ message: "Employee Position updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating the Employee position" });
  }
});

// Getting a single category
router.get("/:Id", async (req, res) => {
  try {
    const employeePositionID = req.params.Id;

    // Find the table by ID
    const EmployeePosition = await Table.findById(employeePositionID);

    if (!EmployeePosition) {
      return res.status(404).json({ error: "Employee Poition not found" });
    }

    res.status(200).json(EmployeePosition);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the category" });
  }
});

module.exports = router;
