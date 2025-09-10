const mongoose = require('mongoose');

const salonSchema = new mongoose.Schema({
  mobile: String,
  password: String,
  email: String,
  ownerName: String,
  salonName: String,
  address: String,
  genderType: String,
  latitude: String,
  longitude: String,

  servicesAndTiming: {
    services: [Object],
    workingDays: [String],
    openingTime: String,
    closingTime: String,
    notes: String,
  },

  bankName: String,
  accountNumber: String,
  accountHolder: String,
  ifsc: String,
  upiId: String,

  shopFrontPhoto: String,
  shopInteriorPhoto: String,
  passbookPhoto: String,
}, { timestamps: true });

module.exports = mongoose.model('Shopkeeper', salonSchema);
