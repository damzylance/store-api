require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connectDB");
const { router } = require("./routes/products");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const app = express();
app.use(express.json());

app.use(router);
app.use(notFound);
app.use(errorHandler);
const PORT = 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`app is running at ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
