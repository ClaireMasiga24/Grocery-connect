const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    produceName: { type: String, required: true },
    tonnage: { type: Number, required: true },
    stockLevel: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stock', StockSchema);
