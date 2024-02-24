const Order = require("../models/orderModel");

// getting all the orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: `No order found` });
    }
    res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: `Error fetching the orders Data` });
  }
};

// adding new order
const addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    if (
      !newOrder.orderItems ||
      newOrder.orderItems.length === 0 ||
      !newOrder.orderTaker
    ) {
      return res.status(400).json({
        message: `Please select items and specify the order Taker to add the order`,
      });
    }
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error adding new order" }); //
  }
};

// get single order
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "No such order" }); //
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "No order found with this id" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: "No such order" });
    }
    await Order.findByIdAndDelete(orderId);
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: `Error deleting order` });
  }
};

module.exports = { getOrders, getOrderById, addOrder, deleteOrder };
