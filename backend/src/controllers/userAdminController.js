// src/controllers/userAdminController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists. Please log in.' });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user._id, role: user.role, name: user.name , email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token ,id: user._id,role: user.role ,name: user.name , email: user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    const { role, email ,name } = req.user;
    try {
        res.json({
            message: email,
            dashboard: role,
            name:name
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDashboard = (req, res) => {
    const { role, email } = req.user;
    if (role === 'admin') {
        res.json({
            message: `Welcome to the admin dashboard, ${email}`,
            dashboard: 'Admin Dashboard Content'
        });
    } else if (role === 'user') {
        res.json({
            message: `Welcome to the user dashboard, ${email}`,
            dashboard: 'User Dashboard Content'
        });
    } else {
        res.status(403).json({ message: 'Access denied. Role not recognized.' });
    }
};

exports.userFindById = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from request parameters
        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await User.findById(id).select("-password"); // Exclude password for security
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.editProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.params.id; // Assuming the ID is in the URL

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update fields if they are provided
        if (name) user.name = name;
        if (email) user.email = email;

        // If password is provided, hash it before updating
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Save updated user
        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

