const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/books", require("./routes/bookRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
