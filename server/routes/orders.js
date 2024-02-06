const express = require("express");
const Order = require("../models/orderModel");

const router = express.Router();

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

module.exports = router;
