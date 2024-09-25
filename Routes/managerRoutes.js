const express = require('express');
const router = express.Router();
const path = require('path');
const viewsPath = path.join(__dirname, '../Views');

// Authentication middleware
function authenticate(req, res, next) {
  const role = req.session.role;
  const username = req.session.username;

  if (role === 'manager' && username) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Route to serve manager HTML
router.get('/', authenticate, (req, res) => {
  res.sendFile('manager.html', { root: viewsPath });
});

module.exports = router;

