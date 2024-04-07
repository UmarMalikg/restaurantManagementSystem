const Employee = require("../models/employeeModel");

// get all employees
const getEmployees = async (req, res) => {
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
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error getting the employees data with error ${err}` });
  }
};

// get single employee
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update an employee
const updateEmployee = async (req, res) => {
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
};

const addEmployee = async (req, res) => {
  try {
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
      emergencyContact: { ec_name, ec_email, ec_phone },
      joiningDate,
      isAdmin,
      isWaiter,
      isCachier,
      isKitchenManager,
      isReceptionist,
      photo,
    } = req.body;
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
};

module.exports = {
  getEmployees,
  getEmployeeById,
  deleteEmployee,
  addEmployee,
  updateEmployee,
};
