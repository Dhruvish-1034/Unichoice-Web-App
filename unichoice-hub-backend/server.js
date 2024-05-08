const express = require("express");
const connect = require("./src/Config/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static("public"));

connect();

app.use("/", require("./src/Routes/userRoutes"));
app.use("/admin", require("./src/Routes/adminRoutes"));
app.use("/user", require("./src/Routes/studentRoutes"));
app.use("/university", require("./src/Routes/universityRoutes"));
app.use("/universityadmission", require("./src/Routes/admissionRoutes"));

app.listen(PORT, () => {
  console.log("App is Running on localhost", PORT);
});
