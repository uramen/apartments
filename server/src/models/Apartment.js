import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  title      : {type: String, required: true},
  description: {type: String, required: true},
  type       : {type: String, required: true},
  rooms      : {type: Number, required: true},
  price      : {type: Number, required: true},
  number     : {type: String},
  images     : {type: Array, required: true},
  vk_profile : {type: String},
  createdAt  : {type: Date, default: Date.now}
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

export default Apartment;
