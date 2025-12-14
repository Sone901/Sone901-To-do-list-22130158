const jwt = require('jsonwebtoken');
const User = require('../models/register');

const JWT_SECRET = process.env.JWT_SECRET || process.env.SESSION_SECRET || 'your-jwt-secret-key';
const JWT_EXPIRY = '7d';

// Generate JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

// Verify JWT token and attach user to request
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        
        if (!token) {
            return res.redirect('/login');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            res.clearCookie('authToken');
            return res.redirect('/login');
        }

        req.user = user;
        req.isAuthenticated = () => true;
        next();
    } catch (err) {
        console.log('JWT verification error:', err.message);
        res.clearCookie('authToken');
        res.redirect('/login');
    }
};

// Set JWT cookie
exports.setAuthCookie = (res, token) => {
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

// Clear auth cookie
exports.clearAuthCookie = (res) => {
    res.clearCookie('authToken');
};

module.exports = exports;
