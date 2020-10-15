const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp", { userNewUrlParser: true });

mongoose.connection
  .once("open", () => console.log("connected to db!!"))
  .on("error", (error) => {
    console.log("Error", error);
  });
