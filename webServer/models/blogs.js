const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  published: { type: String, default: new Date()},
});

module.exports = mongoose.model('Blog', BlogSchema);
