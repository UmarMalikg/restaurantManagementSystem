const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
    default: 4,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const Table = mongoose.model("tables", tableSchema);
module.exports = Table;
