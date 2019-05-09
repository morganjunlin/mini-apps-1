const mongoose = require('mongoose')

// define schema
let Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  address_line_1: String,
  address_line_2: String,
  city: String,
  state: String,
  zip: Number,
  phone_number: Number,
  credit_card: Number,
  expiry_date: Number,
  cvv: Number,
  billing_zip: Number
})

// compile model from schema
module.exports = mongoose.model('User', userSchema);