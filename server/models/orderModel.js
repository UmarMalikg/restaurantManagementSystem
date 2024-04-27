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
  itemStatus: {
    type: String,
    enum: ["Pending", "Preparing", "Ready", "Delivered", "Completed"],
    required: true,
    default: "Pending",
  },
});

const orderSchema = mongoose.Schema(
  {
    orderNo: {
      type: Number,
      required: true,
      unique: true,
      default: 1,
    },
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
      ref: "employees",
    },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Completed"],
      required: true,
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
    customerName: {
      type: String,
      required: this.orderType === "Take-Away" ? true : false,
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
      max: 100,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    subTotal: {
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
    const lastOrder = await this.constructor.findOne(
      {},
      {},
      { sort: { orderNo: -1 } }
    );
    if (lastOrder) {
      this.orderNo = lastOrder.orderNo + 1;
    }
    let totalPrice = 0;
    let subTotal = 0;
    let taxPrice = 0;
    const orderItems = this.orderItems;

    let status;

    if (orderItems.every((item) => item.itemStatus === "Completed")) {
      status = "Completed";
    } else if (
      orderItems.every(
        (item) =>
          item.itemStatus === "Completed" || item.itemStatus === "Delivered"
      )
    ) {
      status = "Delivered";
    } else if (
      orderItems.every(
        (item) =>
          item.itemStatus === "Ready" ||
          item.itemStatus === "Delivered" ||
          item.itemStatus === "Completed"
      )
    ) {
      status = "Ready";
    } else if (
      orderItems.every(
        (item) =>
          item.itemStatus === "Preparing" ||
          item.itemStatus === "Delivered" ||
          item.itemStatus === "Ready" ||
          item.itemStatus === "Completed"
      )
    ) {
      status = "Preparing";
    }

    // Calculate the total price from order items
    for (const i of orderItems) {
      const item = await Product.findById(i.item);
      totalPrice += item.price * i.qty;
      subTotal += item.price * i.qty;
    }

    // Add delivery charges and apply discounts if applicable
    // Apply discount percentage
    const discountAmount = (totalPrice * this.discount) / 100;
    totalPrice -= discountAmount;

    taxPrice = subTotal * 0.18;

    // Add delivery charges
    totalPrice += this.deliveryCharges;
    totalPrice += this.taxPrice;

    // Ensure total price is non-negative
    this.totalPrice = Math.max(totalPrice, 0);
    this.subTotal = Math.max(subTotal, 0);
    this.taxPrice = taxPrice;
    this.status = status;

    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
