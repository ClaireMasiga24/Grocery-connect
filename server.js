require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

// Import route files
const signupRoutes = require('./Routes/signUpRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const landingRoute = require('./Routes/landingRoutes');
const managerRoutes = require('./Routes/managerRoutes');
const salesAgentsRoutes = require('./Routes/salesAgentsRoutes');
const reportRoutes = require('./Routes/reportRoutes');
const settingstRoutes = require('./Routes/settingsRoute');
const produceRoutes = require('./Routes/produceRoutes');
const passwordRoutes=require("./Routes/passwordRoutes")
// Check environment variables
console.log('MONGO_URI:', process.env.MONGO_URI || process.env.DATABASE_LOCAL); 
console.log('PORT:', process.env.PORT);

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || process.env.DATABASE_LOCAL, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'Public')));

// Use session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/manager', managerRoutes);
app.use('/salesAgents',salesAgentsRoutes)
app.use('/reports',reportRoutes)
app.use('/settings',settingstRoutes)
app.use('/ProduceManagement',produceRoutes)


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/manager.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views','manager.html'));
});


app.get('/creditSales.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'creditSales.html'));
});

app.get('/reports.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'reports.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'login.html'));
});

app.get('/password.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'password.html'));
});
app.get('/signUp.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'signUp.html'));
});

app.get('/salesAgents.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'salesAgents.html'));
});

app.get('/produceManagement.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'produceManagement.html'));
});

app.get('/stock.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'stock.html'));
});
app.get('/settings.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'settings.html'));
});
// 404 error handler
app.use((req, res) => {
    res.status(404).send('Page not found');
  });
  
  // Global error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

