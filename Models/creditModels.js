const mongoose = require('mongoose');

const creditSaleSchema = new mongoose.Schema({
    buyerName: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        required: true,
        match: /\d{4}-\d{4}-\d{4}/
    },
    location: {
        type: String,
        required: true
    },
    contacts: {
        type: String,
        required: true,
        match: /\+256\d{9}/
    },
    amountDue: {
        type: Number,
        required: true
    },
    salesAgentName: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    produceName: {
        type: String,
        required: true
    },
    produceType: {
        type: String,
        required: true
    },
    tonnage: {
        type: Number,
        required: true
    },
    dispatchDate: {
        type: Date,
        required: true
    }
});

const CreditSale = mongoose.model('CreditSale', creditSaleSchema);

module.exports = CreditSale;
