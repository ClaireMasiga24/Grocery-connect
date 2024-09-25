const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const { body, validationResult } = require('express-validator');

// @route   POST /signup
// @desc    Sign up a new user
router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').isIn(['manager', 'sales_agent']).withMessage('Invalid role'),
    body('branch').isIn(['maganjo', 'matugga']).withMessage('Invalid branch')
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, username, password, role, branch } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            username,
            password,  // Plain text password (not secure for production)
            role,
            branch
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
