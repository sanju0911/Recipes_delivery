const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  customerEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  recipes: [
    {
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipes",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  recipeName: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "deactive",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", orderSchema);
