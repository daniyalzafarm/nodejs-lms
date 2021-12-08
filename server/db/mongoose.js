const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/lms", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((e) => {
    console.log(e);
  });

// Database Run Command
// /Development/NodeJs/Database/mongodb/bin/mongod.exe --dbpath=/Development/NodeJs/Database/mongodb-data
