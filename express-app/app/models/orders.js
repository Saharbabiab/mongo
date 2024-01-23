const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ordersSchema = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: "Books" }],
  total: Number,
  date: Date,
});

const Order = model("Order", ordersSchema);
module.exports = Order;
