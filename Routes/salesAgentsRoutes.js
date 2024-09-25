const express = require('express');
const router = express.Router();
const Sale = require('../Models/salesModels');
const path = require('path');
const viewsPath = path.join(__dirname, '../Views');

// Authentication middleware
function authenticate(req, res, next) {
  const role = req.session.role;
  const username = req.session.username;

  if (role === 'sales_agent' && username) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Route to serve sales agent HTML
router.get('/', authenticate, (req, res) => {
  res.sendFile('salesAgent.html', { root: viewsPath });
});

// @route POST /sales/add-sale
// @desc Add a new sale record
router.post('/add-sale', authenticate, async (req, res) => {
  try {
    const newSale = new Sale({
      produceName: req.body['produce-name'],
      quantity: req.body.quantity,
      amountPaid: req.body['amount-paid'],
      buyerName: req.body['buyer-name'],
      agentName: req.body['agent-name'],
      saleDate: req.body['sale-date'],
      saleTime: req.body['sale-time']
    });

    // Save the new sale record
    await newSale.save();
    res.status(201).json({ message: 'Sale recorded successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record sale.' });
  }
});

// @route GET /sales/records
// @desc Get all sales records
router.get('/records', authenticate, async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve sales records.' });
  }
});

module.exports = router;

