const app = require('./app');
const dotenv = require('dotenv');
const { cyan, red } = require('colors');
const connectDB = require('./config/dataBase');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


const port = process.env.PORT || 4000;

// Connecting to the database
connectDB();



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