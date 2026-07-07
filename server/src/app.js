const express = require("express");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes =  require("./routes/orderRoutes");
const refundRoutes =  require("./routes/refundRoutes");


const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);


app.use("/api/addresses",addressRoutes);

app.use("/api/orders",orderRoutes);

app.use("/api/returns", require("./routes/returnRoutes"));

app.use("/api/refunds",refundRoutes);

module.exports = app;