const express = require("express");
const path = require("path");
const hbs = require("hbs");

// Creating app
const app = express();
const port = process.env.port || 3000;

// Connecting Database
require("./server/db/mongoose");

// Defining Paths
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

// Register Screens Paths
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routers
var indexRouter = require("./server/routes/index");
var adminRouter = require("./server/routes/admin");
var studentRouter = require("./server/routes/student");
var teacherRouter = require("./server/routes/teacher");
var headRouter = require("./server/routes/head");

// Using Routers
app.use(express.json());
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/head", headRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

app.listen(port, () => {
  console.log("Server is running on Port", port);
});
