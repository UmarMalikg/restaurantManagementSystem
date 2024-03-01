const express = require("express");
const Order = require("../models/orderModel");

const {
  getOrders,
  getOrderById,
  addOrder,
  deleteOrder,
  updateOrder,
  updateOrderItemStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/").get(getOrders).post(addOrder);

router
  .route("/:orderId")
  .get(getOrderById)
  .delete(deleteOrder)
  .put(updateOrder);

router.route("/:orderId/items/:itemId/status").put(updateOrderItemStatus);

module.exports = router;
