const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
    },
    tonnage: {
        type: Number,
        required: true,
        min: 1000
    },
    cost: {
        type: Number,
        required: true,
        min: 10000
    },
    dealerName: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        match: /^[0-9]{10,}$/
    },
    sellingPrice: {
        type: Number,
        required: true,
        min: 10000
    }
});

const Produce = mongoose.model('Produce', produceSchema);

module.exports = Produce;
