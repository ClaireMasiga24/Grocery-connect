const express = require('express');
const router = express.Router();
const CreditSale = require('../Models/creditModels');

// @route   POST /credit-sales
// @desc    Create a new credit sale
router.post('/', async (req, res) => {
    const { buyerName, nationalId, location, contacts, amountDue, salesAgentName, dueDate, produceName, produceType, tonnage, dispatchDate } = req.body;

    try {
        const newCreditSale = new CreditSale({
            buyerName,
            nationalId,
            location,
            contacts,
            amountDue,
            salesAgentName,
            dueDate,
            produceName,
            produceType,
            tonnage,
            dispatchDate
        });

        await newCreditSale.save();
        res.status(201).json({ message: 'Credit sale created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// @route   GET /credit-sales
// @desc    Get all credit sales
router.get('/', async (req, res) => {
    try {
        const creditSales = await CreditSale.find();
        res.status(200).json(creditSales);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// @route   GET /credit-sales/:id
// @desc    Get a credit sale by ID
router.get('/:id', async (req, res) => {
    try {
        const creditSale = await CreditSale.findById(req.params.id);
        if (!creditSale) {
            return res.status(404).json({ error: 'Credit sale not found' });
        }
        res.status(200).json(creditSale);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// @route   PUT /credit-sales/:id
// @desc    Update a credit sale by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCreditSale = await CreditSale.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCreditSale) {
            return res.status(404).json({ error: 'Credit sale not found' });
        }
        res.status(200).json(updatedCreditSale);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// @route   DELETE /credit-sales/:id
// @desc    Delete a credit sale by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCreditSale = await CreditSale.findByIdAndDelete(req.params.id);
        if (!deletedCreditSale) {
            return res.status(404).json({ error: 'Credit sale not found' });
        }
        res.status(200).json({ message: 'Credit sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;
