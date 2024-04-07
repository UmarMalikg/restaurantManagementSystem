const express = require("express");
const router = express.Router();
// const uploadToCloudinary = require("../middleware/upload");
const {
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  addEmployee,
} = require("../controllers/employeeController");

router.route("/").post(addEmployee).get(getEmployees);

router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
