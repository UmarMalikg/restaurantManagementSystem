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

// delete single order
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

// update single order
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updateData = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "No such order" });
    }
    await Order.findByIdAndUpdate(orderId, updateData, { new: true });
    return res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error updating the order" });
  }
};

// update single item's status
const updateOrderItemStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const itemId = req.params.itemId;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const itemIndex = order.orderItems.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item in this order not found" });
    }

    // Assuming newStatus is received from the request body or query parameters
    const newStatus = req.body.newStatus; // Adjust this according to your request format

    order.orderItems[itemIndex].itemStatus = newStatus;
    await order.save();

    return res.status(200).json(order);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating the order item status", error: err });
  }
};

// update order's status
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    let newStatus = req.body.newStatus;

    const allItemsCompleted = order.orderItems.every(
      (item) => item.itemStatus === "Completed"
    );

    const allItemsDelivered = order.orderItems.every(
      (item) =>
        item.itemStatus === "Delivered" || item.itemStatus === "Completed"
    );

    const allItemsPreparing = order.orderItems.every(
      (item) =>
        item.itemStatus === "Preparing" ||
        item.itemStatus === "Delivered" ||
        item.itemStatus === "Ready" ||
        item.itemStatus === "Completed"
    );

    const allItemsReady = order.orderItems.every(
      (item) =>
        item.itemStatus === "Ready" ||
        item.itemStatus === "Delivered" ||
        item.itemStatus === "Completed"
    );

    if (newStatus === "Completed" && !allItemsCompleted) {
      order.orderItems.forEach((item) => {
        item.itemStatus = "Completed";
      });
    } else if (newStatus === "Delivered" && !allItemsDelivered) {
      order.orderItems.forEach((item) => {
        if (item.itemStatus !== "Completed") {
          item.itemStatus = "Delivered";
        }
      });
    } else if (newStatus === "Ready" && !allItemsReady) {
      order.orderItems.forEach((item) => {
        if (
          item.itemStatus !== "Completed" &&
          item.itemStatus !== "Delivered"
        ) {
          item.itemStatus = "Ready";
        }
      });
    } else if (newStatus === "Preparing" && !allItemsPreparing) {
      order.orderItems.forEach((item) => {
        if (
          (item.itemStatus !== "Completed" &&
            item.itemStatus !== "Delivered") ||
          item.itemStatus === "Ready"
        ) {
          item.itemStatus = "Preparing";
        }
      });
    }
    await order.save();
    return res
      .status(200)
      .json({ message: `Status Updated successfully`, order });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating the order's' status", error: err });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const itemId = req.params.itemId;

    // Find the order by its ID
    const order = await Order.findById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the index of the item in the order's orderItems array
    const itemIndex = order.orderItems.findIndex(
      (item) => item._id.toString() === itemId
    );

    // Check if the item exists in the order
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item in this order not found" });
    }

    // Remove the item from the order's orderItems array
    order.orderItems.splice(itemIndex, 1);

    // Save the updated order
    await order.save();

    // Return a success response
    return res
      .status(200)
      .json({ message: "Item deleted successfully", order });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting item from order", error: err });
  }
};

const updateOrderDiscount = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { discount } = req.body;

    // Check if the discount is a valid number
    if (typeof discount !== "number" || discount < 0 || discount > 100) {
      return res.status(400).json({ error: "Discount must be a number" });
    }

    // Find the order by ID
    const order = await Order.findById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the discount and recalculate total price
    order.discount = discount;
    await order.save();

    return res
      .status(200)
      .json({ message: "Discount updated successfully", order });
  } catch (error) {
    console.error("Error updating order discount:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateDeliveryCharges = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { deliveryCharges } = req.body;

    // Check if the discount is a valid number
    if (typeof deliveryCharges !== "number") {
      return res
        .status(400)
        .json({ error: "deliveryCharges must be a number" });
    }

    // Find the order by ID
    const order = await Order.findById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the discount and recalculate total price
    order.deliveryCharges = deliveryCharges;
    await order.save();

    return res
      .status(200)
      .json({ message: "Discount updated successfully", order });
  } catch (error) {
    console.error("Error updating order discount:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  deleteOrder,
  updateOrder,
  updateOrderItemStatus,
  updateOrderStatus,
  deleteOrderItem,
  updateOrderDiscount,
  updateDeliveryCharges,
};
