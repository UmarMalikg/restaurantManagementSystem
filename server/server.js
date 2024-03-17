const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
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
const loginRoute = require(`./routes/login`);
const userAuthRoute = require(`./routes/userAuth`);
const userRoute = require(`./routes/users`);
const orderRoute = require(`./routes/orders`);
const floorRoute = require(`./routes/floors`);

dotenv.config();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:19006"],
    credentials: true,
  })
);
app.use(express.json());
connectDB();

app.use(`/tables`, tableRoute);
app.use(`/categories`, categoryRoute);
app.use(`/products`, productRoute);
app.use(`/employees`, employeeRoute);
app.use(`/login`, loginRoute);
app.use(`/userAuth`, userAuthRoute);
app.use(`/users`, userRoute);
app.use(`/orders`, orderRoute);
app.use(`/floors`, floorRoute);

app.listen(port, () => {
  console.log("app works");
});
