const express = require('express');
const app = express();
const errorMiddleWare = require('./middleware/error')

app.use(express.json())
//route imports
const product = require("./routes/productRoute");
app.use("/api/v1",product);


//middleware for error
app.use(errorMiddleWare)


module.exports = app;