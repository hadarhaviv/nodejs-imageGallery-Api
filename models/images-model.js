const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//model declaration
const imagesSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  hashtags: [
    {
      type: String
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

//model registration
const imagesModel = mongoose.model("images", imagesSchema);

module.exports = imagesModel;
