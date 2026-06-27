require('dotenv').config();

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Welcome email content
    const mailOptions = {
      from: `"Education Buddy Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Education Buddy',
      text: `Hi ${username},

Welcome to Placement Predictor Buddy – your trusted platform for learning and growth!

We're excited to have you on board. You can now log in and start exploring the features made just for you.

If you have any questions, just reply to this email.

– The Education Buddy Team`,
      html: `<p>Hi <b>${username}</b>,</p>
             <p>Welcome to <strong>Placement Predictor Buddy</strong> – your trusted platform for learning and growth!</p>
             <p>We're excited to have you on board. You can now log in and start exploring the features made just for you.</p>
             <p>If you have any questions, just reply to this email.</p>
             <p>– The Education Buddy Team</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending welcome email:', error);
        return res.status(201).json({ message: 'User created, but email not sent' });
      } else {
        console.log('Welcome email sent:', info.response);
        return res.status(201).json({ message: 'User created and welcome email sent' });
      }
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token using env variable
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      username: user.username,
      email: user.email
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

module.exports = router;
