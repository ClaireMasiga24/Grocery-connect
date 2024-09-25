const express = require('express');
const router = express.Router();
const ProduceSale = require('../Models/produceManagementModels');

// Route to handle adding new produce
router.post('/add-produce', async (req, res) => {
    try {
        const { name, quantity, price, branch } = req.body;
        const newProduce = new ProduceSale({
            type: 'produce',
            name,
            quantity,
            price,
            branch
        });
        await newProduce.save();
        res.status(201).json({ message: 'Produce added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding produce', error });
    }
});

// Route to handle recording a sale
router.post('/record-sale', async (req, res) => {
    try {
        const { produceId, quantity, branch } = req.body;
        const newSale = new ProduceSale({
            type: 'sale',
            produceId,
            quantity,
            branch
        });
        await newSale.save();
        res.status(201).json({ message: 'Sale recorded successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error recording sale', error });
    }
});

// Route to get produce options for the manager section
router.get('/produce-options', async (req, res) => {
    try {
        const produceList = await ProduceSale.find({ type: 'produce' });
        res.status(200).json(produceList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching produce options', error });
    }
});

module.exports = router;
