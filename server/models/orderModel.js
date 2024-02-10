const mongoose = require("mongoose");
const Product = require("./productModel");

const orderItemSchema = mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const orderSchema = mongoose.Schema(
  {
    tableNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tables",
      required: this.orderType === "Dine-In" ? true : false,
    },
    orderItems: [orderItemSchema],
    orderType: {
      type: String,
      enum: ["Dine-In", "Take-Away", "Delivery"],
      required: true,
      default: "Dine-In",
    },
    orderTaker: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: this.orderType === "Delivery" ? "users" : "employees",
    },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Completed"],
      default: "Pending",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    deliveryAddress: {
      type: String,
      required: this.orderType === "Delivery" ? true : false,
    },

    deliveryCharges: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    taxPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", async function (next) {
  try {
    let totalPrice = 0;
    const orderItems = this.orderItems;

    // Calculate the total price from order items
    for (const i of orderItems) {
      const item = await Product.findById(i.item);
      totalPrice += item.price * item.qty;
    }

    // Add delivery charges and apply discounts if applicable
    totalPrice += this.deliveryCharges;
    totalPrice -= this.discount;

    // Ensure total price is non-negative
    this.totalPrice = Math.max(totalPrice, 0);

    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
