const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shorturlSchema = new Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
});

module.exports = mongoose.model("shorturl", shorturlSchema);
