const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Student API is running 🚀", status: "OK" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
