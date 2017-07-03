var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var LegoSchema = new Schema({
  title: String,
  language: String,
  type: String,
  content: String,
  tag: String,
});


module.exports = mongoose.model('Lego', LegoSchema);
