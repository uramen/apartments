import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  title      : {type: String, required: true},
  description: {type: String, required: true},
  type       : {type: String, required: true},
  rooms      : {type: Number, required: true},
  price      : {type: Number, required: true},
  number     : {type: String, required: true},
  images     : {type: Array, required: true},
  street     : {type: String, required: true},
  vk_profile : {type: String},
  createdAt  : {type: Date, default: Date.now}
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

export default Apartment;
