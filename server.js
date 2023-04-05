const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./middlewares/auth');
const { adminOnly, merchantOnly, consumerOnly } = require('./middlewares/roles');
const { registerUser, loginUser } = require('./controllers/auth');
const { JWT_SECRET } = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://osha123:test123@sandbox.bgoy6.mongodb.net/booking?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true,
}).then(
    () => { console.log("DB connected") },
    err => { console.log(err) }
);



app.use(express.json());

// Define the routes for user registration and login
app.post('/register', registerUser);
app.post('/login', loginUser);

// Define the protected routes that require specific user roles
app.get('/admin-only', authenticateToken, adminOnly, (req, res) => {
    res.json({ message: 'Hello, admin!' });
});

app.get('/merchant-only', authenticateToken, merchantOnly, (req, res) => {
    res.json({ message: 'Hello, merchant user!' });
});

app.get('/consumer-only', authenticateToken, consumerOnly, (req, res) => {
    res.json({ message: 'Hello, consumer user!' });
});

// Define the home route that is accessible without authentication
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my app!' });
});

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
