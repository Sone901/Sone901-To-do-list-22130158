const User = require('../models/register');
const bcrypt = require('bcryptjs');
const { generateToken, setAuthCookie } = require('../middleware/auth');

module.exports.register = function(req, res) {
    return res.render('login', { 
        title: "Register"
    });
};

module.exports.createUser = async function(req, res) {
    try {
        const { name, lastName, phone, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            console.log('User already exists');
            return res.status(400).send('Email already registered');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            name: name,
            lastName: lastName || '',
            phone: phone || '',
            email: email,
            password: hashedPassword
        });

        console.log('User created:', newUser);

        // Auto login with JWT after registration
        const token = generateToken(newUser._id);
        setAuthCookie(res, token);
        return res.redirect('/dashboard');

    } catch (err) {
        console.log('Error creating user:', err);
        return res.status(500).send('Error creating account');
    }
};
