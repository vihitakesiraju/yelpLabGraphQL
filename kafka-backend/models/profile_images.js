const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const proimage_schema = new Schema({
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  image_path: {
    type: String,
    
  },
  
});

module.exports = proimage_data = mongoose.model(
  "proimage_data",
  proimage_schema,
  "proimage_data"
);
