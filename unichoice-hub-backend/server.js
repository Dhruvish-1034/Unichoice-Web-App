const express = require("express");
const connect = require("./src/Config/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// parse the request body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

// establish db connection
connect();

app.use("/", require("./src/Routes/userRoutes"));

app.listen(PORT, () => {
  console.log("App is Running on localhost", PORT);
});
