const express = require('express');
const router = express.Router();

// GET - Render homepage
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html')); // Serve index.html from public folder
});

module.exports = router;
