const app = require('./app');
const dotenv = require('dotenv');
const { cyan, red } = require('colors');
const connectDB = require('./config/dataBase');
const cloudinary = require("cloudinary")

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config({path:"backend/config/config.env"})

const port = process.env.PORT || 4000;

// Connecting to the database
connectDB();

cloudinary.config({
cloud_name: process.env.CLOUDINARY_NAME,
api_key: process.env.API_KEY,
secret_key: process.env.SECRET_KEY
})



const server = app.listen(port, () => {
  console.log(`Server is running on port ${cyan(`http://localhost:${port}`)}`);
});

// unhandled promise rejection
process.on('unhandledRejection',err=>{
  console.error("Unhandled Rejection", err.message);
  console.log(red("Shutting down the server"));

  server.close(()=>{
    process.exit(1)
  })
})