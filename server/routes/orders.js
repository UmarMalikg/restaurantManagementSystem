const express = require("express");
const Order = require("../models/orderModel");

const {
  getOrders,
  getOrderById,
  addOrder,
  deleteOrder,
  updateOrder,
  updateOrderItemStatus,
  updateOrderStatus,
  deleteOrderItem,
  updateOrderDiscount,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/").get(getOrders).post(addOrder);

router
  .route("/:orderId")
  .get(getOrderById)
  .delete(deleteOrder)
  .put(updateOrder)
  .patch(updateOrderDiscount);

router.route("/:orderId/items/:itemId/status").put(updateOrderItemStatus);

router.route("/:orderId/status").put(updateOrderStatus);

router.route("/:orderId/items/:itemId/delete").put(deleteOrderItem);

module.exports = router;
