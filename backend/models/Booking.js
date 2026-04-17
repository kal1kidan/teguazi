const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: String, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  date: { type: Date, required: true },
  travelers: { type: Number, default: 1 }
});

module.exports = mongoose.model('Booking', bookingSchema);
