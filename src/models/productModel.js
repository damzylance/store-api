const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name field is required"],
      trim: true,
    },
    price: { type: Number, required: [true, "price field is required"] },
    rating: { type: Number, default: 4.5 },
    featured: { type: Boolean, default: false },

    company: {
      type: String,
      enum: {
        values: ["jumia", "dangote", "estrade", "afroverse"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productModel);
