const Product = require("../models/productModel");
const asyncWrapper = require("../middlewares/asyncHandler");
const query = require("express/lib/middleware/query");
const getProducts = asyncWrapper(async (req, res) => {
  const { featured, company, name, sort, field } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured;
  }
  if (company) {
    queryObject.company = { $regex: company, $options: "i" };
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    console.log(sortList);
    result = result.sort(sortList);
  }
  if (field) {
    const selectList = field.split(",").join(" ");
    result = result.select(selectList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;
  const productList = await result.limit(limit).skip(skip);
  res
    .status(200)
    .json({ success: true, data: productList, nbHit: productList.length });
});
const getProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    const error = new Error("No product selected");
    error.status = 500;
    return next(error);
  }
  console.log(product);
  return res.status(200).json({ success: true, data: product });
});
const createProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.create(req.body);
  console.log(product);
  if (!product) {
    const error = new Error("No product to add");
    error.status = 404;
    return next(error);
  }
  return res.status(200).json({ success: true, data: product });
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    const error = new Error("No product with the ID");
    error.status = 404;
    return next(error);
  }
  res.status(200).json({ success: true, data: product });
});
const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findByIdAndDelete(productID);

  if (!product) {
    const error = new Error("Product Does not exist");
    error.status = 404;
    return next(error);
  }

  res.status(200).json({ success: true, data: product });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
