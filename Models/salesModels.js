const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    produceName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    buyerName: {
        type: String,
        required: true
    },
    agentName: {
        type: String,
        required: true
    },
    saleDate: {
        type: Date,
        required: true
    },
    saleTime: {
        type: String,
        required: true
    }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
