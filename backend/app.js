const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Middleware
app.use(cors({
    origin: 'https://makehub.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/recipe', require('./routes/recipe.routes'));
app.use('/api/bot', require('./routes/bot.routes'));

// Healthcheck route
app.get('/api/healthcheck', (req, res) => {
    res.send('I am alive');
});

// Export the app for Vercel serverless function
module.exports = app;
