// settingsRoute.js
const express = require('express');
const router = express.Router();
const Settings = require('../Models/settingsModel'); // Import the Settings model

// Route to save settings
router.post('/settings', async (req, res) => {
    try {
        const { username, email, password, notificationSettings, timezone, language } = req.body;

        // Validate the input if necessary (e.g., check email format)

        // Create or update the user's settings in the database
        const updatedSettings = await Settings.findOneAndUpdate(
            { email: email },  // Find user by email
            {
                username,
                password,
                notificationSettings,
                timezone,
                language
            },
            { new: true, upsert: true }  // Create if doesn't exist
        );

        res.status(200).json({ message: 'Settings updated successfully', data: updatedSettings });
    } catch (error) {
        res.status(500).json({ message: 'Error saving settings', error });
    }
});

// Route to retrieve current settings
router.get('/settings/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const settings = await Settings.findOne({ email });

        if (settings) {
            res.status(200).json(settings);
        } else {
            res.status(404).json({ message: 'Settings not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving settings', error });
    }
});

module.exports = router;
