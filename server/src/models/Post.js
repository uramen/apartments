const mongoose = require('mongoose');
const autoIncrement = require('mongodb-autoincrement');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id        : {type: Number},
  post_id    : {type: Number, required: true, index: {unique: true}},
  group_id   : {type: Number, required: true},
  user_id    : {type: Number, required: true},
  date       : {type: Number, required: true},
  text       : {type: String, required: true},
  attachments: {type: Object, required: true}
},{_id: false});

postSchema.plugin(autoIncrement.mongoosePlugin);
const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;
