const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadingEmployeePhoto");
const {
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  addEmployee,
} = require("../controllers/employeeController");

router.route("/").post(upload.single("photo"), addEmployee).get(getEmployees);

router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
