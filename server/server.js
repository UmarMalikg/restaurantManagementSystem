const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const connectDB = require("./config/config");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

const server = createServer(app);
const io = new Server(server);
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

// app.use("/uploads", express.static(process.cwd() + "/uploads"));
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
    origin: [
      "http://localhost:19006",
      "http://192.168.43.125:19006",
      "exp://192.168.43.125:8081",
    ],
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

io.on("connection", (socket) => {
  console.log("Client connected");

  // Emitting event when there's a  change in order
  socket.on("orderChanged", () => {
    console.log("Order added event received");
    io.emit("orderChanged");
  });
  socket.on("employeeChanged", () => {
    console.log("Employee added event received");
    io.emit("employeeChanged");
  });
  socket.on("tableChanged", () => {
    console.log("Table added event received");
    io.emit("tableChanged");
  });
  socket.on("productChanged", () => {
    console.log("Product added event received");
    io.emit("productChanged");
  });
  socket.on("floorChanged", () => {
    console.log("Floor added event received");
    io.emit("floorChanged");
  });
  socket.on("categoryChanged", () => {
    console.log("Category added event received");
    io.emit("categoryChanged");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log("app works");
});
