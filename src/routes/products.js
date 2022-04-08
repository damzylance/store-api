const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const router = express.Router();

router.get("/api/v1/products", getProducts);
router.get("/api/v1/products/:id", getProduct);
router.post("/api/v1/products/", createProduct);
router.patch("/api/v1/products/:id", updateProduct);
router.delete("/api/v1/products/:id", deleteProduct);
module.exports = { router };
