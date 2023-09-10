const { red, green } = require('colors');
const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://raheelmughal018:raheelmughal018@cluster0.sqrgday.mongodb.net/"

const connectDB = () => {
  mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(green(`MongoDB connected with server: ${mongoose.connection.host}`));
    })
 
}

module.exports = connectDB;
