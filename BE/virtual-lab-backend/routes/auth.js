const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Rute untuk registrasi pengguna baru
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Periksa jika email sudah terdaftar
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'Email already registered.' });

        // Buat pengguna baru
        const user = await User.create({ email, password });

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Rute untuk login pengguna
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari pengguna berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

        // Periksa password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        // Buat token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;