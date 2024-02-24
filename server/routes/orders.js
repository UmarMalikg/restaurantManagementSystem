const express = require("express");
const Order = require("../models/orderModel");

const {
  getOrders,
  getOrderById,
  addOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/").get(getOrders).post(addOrder);

// getting the single order
router
  .route("/:orderId")
  .get(getOrderById)
  .delete(deleteOrder)
  .put(updateOrder);

// deleting the order

module.exports = router;
