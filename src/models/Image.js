const { Schema, model } = require("mongoose");

const ImageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  extname: { type: String },
  mimetype: { type: String },
  size: { type: Number },
  created_at: { type: Date, default: Date.now()}
});

module.exports = model('Image', ImageSchema);
