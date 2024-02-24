const express = require("express");

const {
  getTableById,
  getTables,
  addTable,
  deleteTable,
  updateTable,
} = require("../controllers/tableController");

const router = express.Router();

router.route("/").post(addTable).get(getTables);

router
  .route("/:tableId")
  .get(getTableById)
  .put(updateTable)
  .delete(deleteTable);

module.exports = router;
