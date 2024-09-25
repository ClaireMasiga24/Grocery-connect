const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['sales', 'stock', 'deferredPayments'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  branch: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Report', reportSchema);