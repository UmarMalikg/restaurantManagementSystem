const mongoose = require("mongoose");

const employeePositionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const EmployeePosition = mongoose.model(
  "employeePositions",
  employeePositionSchema
);
module.exports = EmployeePosition;
