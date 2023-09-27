const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//middleware for error
app.use(errorMiddleWare);

module.exports = app;
