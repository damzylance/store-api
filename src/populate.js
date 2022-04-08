require("dotenv").config();
const connectDB = require("./db/connectDB");
const Product = require("./models/productModel");
const productList = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    console.log("Database cleared");
    await Product.create(productList);
    console.log("Database populated");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
