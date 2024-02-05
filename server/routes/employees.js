const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const Employee = require("../models/employeeModel");

// Multer configuration for photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/employees"); // Specify the destination folder for storing images
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Create a new employee
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    // Extract data from the request body
    const {
      personalInfo: {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        nationalID,
        email,
        phone,
      },
      address: { street, city, state, zipCode, country },
      pswrd,
      salary,
      userName,
      isAdmin,
      isWaiter,
      isCachier,
      isKitchenManager,
      isReceptionist,
      joiningDate,
      emergencyContact: { ec_name, ec_email, ec_phone },
    } = req.body;
    const photo = req.file.path;

    // const photo = req.file.path;

    // Check if all required fields are provided
    if (
      !salary ||
      !userName ||
      // !position ||
      // !photo ||
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !joiningDate ||
      !pswrd
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Create a new Employee instance with the extracted data
    const newEmployee = new Employee({
      personalInfo: {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        nationalID,
        email,
        phone,
      },
      pswrd,
      photo,
      salary,
      userName,
      address: { street, city, state, zipCode, country },
      joiningDate,
      isAdmin,
      isWaiter,
      isCachier,
      isKitchenManager,
      isReceptionist,
      emergencyContact: { ec_name, ec_email, ec_phone },

      // contactInfo: { email, phone },
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    // Check for duplicate key error
    if (error.name === "MongoError" && error.code === 11000) {
      // Duplicate key error (unique constraint violation)
      const duplicateField = Object.keys(error.keyPattern)[0];
      const duplicateValue = error.keyValue[duplicateField];
      console.error(
        `Error: Duplicate ${duplicateField} value '${duplicateValue}'`
      );
      res.status(400).json({
        error: `Duplicate ${duplicateField} value '${duplicateValue}'. ${duplicateField} must be unique.`,
      });
    } else {
      // Handle other errors
      console.error("Error creating a new employee:", error);
      res.status(500).json({ error: "Error creating a new employee" });
    }
  }
});

// Get all employees
router.get("/", async (req, res) => {
  const selectedPosition = req.query.position;
  try {
    if (!selectedPosition) {
      const employees = await Employee.find();
      return res.status(200).json(employees);
    }
    const employees = await Employee.find({ position: selectedPosition });
    if (!employees || employees.length === 0) {
      return res
        .status(404)
        .json({ message: "No Employee found for the given Position" });
    }

    return res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update employee by ID
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
