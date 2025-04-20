import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  speciality: String,
  degree: String,
  experience: String,
  about: String,
  available: Boolean,
  fee: Number,
  address: Object,
  date: Number,
  slots_booked: { type: Object, default: {} }
}, { minimize: false });

const doctorModel = mongoose.model('doctor', doctorSchema);
export { doctorModel };



