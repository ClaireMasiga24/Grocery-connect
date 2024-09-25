const express = require('express');
const router = express.Router();

// Dummy data for user validation (replace with your database logic)
const managerUsernames = ['managerSsali', 'managerNamakula'];
const salesAgentUsernames = ['salesMubiru', 'salesAchieng'];
const validPassword = 'Deathyhallows#!';

// Login route
router.post('/', (req, res) => {
    const { username, password, role } = req.body;

    if (password === validPassword) {
        if (role === 'manager' && managerUsernames.includes(username)) {
            // Successful login for manager
            res.json({ success: true, role: 'manager', username });
        } else if (role === 'sales_agent' && salesAgentUsernames.includes(username)) {
            // Successful login for sales agent
            res.json({ success: true, role: 'sales_agent', username });
        } else {
            // Invalid username or role combination
            res.status(401).json({ success: false, message: 'Invalid username or role combination.' });
        }
    } else {
        // Invalid password
        res.status(401).json({ success: false, message: 'Invalid password.' });
    }
});

module.exports = router;
