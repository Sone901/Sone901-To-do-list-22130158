const User = require('../models/register');
const bcrypt = require('bcryptjs');
const { generateToken, setAuthCookie, clearAuthCookie } = require('../middleware/auth');

module.exports.login = function(req, res) {
    return res.render('login', { 
        title: "Login"
    });
};

module.exports.createSession = async function(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email: email });

        if (!user) {
            console.log('User not found');
            return res.status(401).send('Invalid email or password');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).send('Invalid email or password');
        }

        // Generate JWT token and set cookie
        const token = generateToken(user._id);
        setAuthCookie(res, token);
        console.log('User logged in:', user.email);
        return res.redirect('/dashboard');

    } catch (err) {
        console.log('Error:', err);
        return res.status(500).send('Error logging in');
    }
};

module.exports.logout = function(req, res) {
    clearAuthCookie(res);
    console.log('User logged out');
    return res.redirect('/login');
};
