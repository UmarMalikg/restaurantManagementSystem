const express = require("express");
const {
  addFloor,
  getFloor,
  getFloorById,
  deleteFloor,
  updateFloor,
} = require("../controllers/floorController");

const router = express.Router();

router.route("/").post(addFloor).get(getFloor);

router
  .route("/:floorId")
  .get(getFloorById)
  .put(updateFloor)
  .delete(deleteFloor);

module.exports = router;
