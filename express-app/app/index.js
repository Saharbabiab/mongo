const bodyParser = require("body-parser");
const express = require("express");
const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/author");
const OrdersRouter = require("./routes/order");

const app = express();
app.use(bodyParser.json());
app.use("/api/books", booksRouter);
app.use("/api/author", authorsRouter);
app.use("/api/order", OrdersRouter);

module.exports = app;
