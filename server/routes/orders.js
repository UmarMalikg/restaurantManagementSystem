const express = require("express");
const Order = require("../models/orderModel");

const router = express.Router();

// post api for orders
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    if (
      !newOrder.orderItems ||
      newOrder.orderItems.length === 0 ||
      !newOrder.orderTaker
    ) {
      return res
        .status(400)
        .send(
          "Please select items and specify an order taker to create an order"
        );
    }

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error creating new Order" });
  }
});

// get api for all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: `No orders found` });
    }
    res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching the orders data" });
  }
});

// getting the single order
router.get("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "No order exists with this id " });
    }
    res.status(200).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error fetching the order with id ${orderId}` });
  }
});

// deleting the order
router.delete(`/:orderId`, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(orderId);
    return res.status(204).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: `Error deleting the order` });
  }
});

module.exports = router;
