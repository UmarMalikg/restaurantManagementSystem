const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const connectDB = require("./config/config");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(process.cwd() + "/uploads"));
// importing routes
const tableRoute = require(`./routes/tables`);
const categoryRoute = require(`./routes/categories`);
const productRoute = require(`./routes/products`);
const employeeRoute = require(`./routes/employees`);
const employeePositionRoute = require(`./routes/employeePositions`);

dotenv.config();
app.use(cors());
app.use(express.json());
connectDB();

app.use(`/tables`, tableRoute);
app.use(`/categories`, categoryRoute);
app.use(`/products`, productRoute);
app.use(`/employees`, employeeRoute);
app.use(`/employeePositions`, employeePositionRoute);

app.listen(port, () => {
  console.log("app works");
});
