const mongoose = require('mongoose');

const produceSaleSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['produce', 'sale'],
        required: true
    },
    name: String, // Used for 'produce'
    quantity: Number,
    price: Number, // Used for 'produce'
    branch: String,
    produceId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProduceSale' }, // Used for 'sale'
    date: { type: Date, default: Date.now } // Used for 'sale'
});

const ProduceSale = mongoose.model('ProduceSale', produceSaleSchema);
module.exports = ProduceSale;
