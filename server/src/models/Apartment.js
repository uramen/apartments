const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  description: { type: String, required: true },
  type: { type: String, required: true },
  rooms: { type: Number, required: true}
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
