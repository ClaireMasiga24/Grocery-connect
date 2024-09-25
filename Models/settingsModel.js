const mongoose = require('mongoose');

// Define schema for user settings
const SettingsSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },  // Remember to hash passwords in real-world apps
    notificationSettings: { type: String, enum: ['all', 'important', 'none'], default: 'all' },
    timezone: { type: String, required: true },
    language: { type: String, enum: ['en', 'es', 'fr', 'de'], default: 'en' }
});

// Create a model from the schema
const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings;
