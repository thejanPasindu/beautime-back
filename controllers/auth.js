const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

async function registerUser(req, res) {
    try {
        const { email, password, role } = req.body;
        const user = new User({ email, password, role });
        await user.save();

        const token = jwt.sign({ email, role }, JWT_SECRET);

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { registerUser, loginUser };
