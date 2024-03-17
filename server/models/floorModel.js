const mongoose = require("mongoose");

const floorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Floor = mongoose.model("floors", floorSchema);
module.exports = Floor;
