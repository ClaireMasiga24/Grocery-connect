const express = require('express');
const router = express.Router();
const User = require('../Models/user'); // Assuming you have a User model

// POST route for password reset
router.post('/reset-password', async (req, res) => {
    const { password, confirmPassword, userId } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's password
        user.password = password;
        await user.save();

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during the password reset process" });
    }
});

module.exports = router;
