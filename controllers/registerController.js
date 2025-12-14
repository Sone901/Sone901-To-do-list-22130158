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
            return res.render('login', {
                title: "Register",
                error: 'Email đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.',
                showSignup: true
            });
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

        // Show success message and redirect to login
        return res.render('login', {
            title: "Login",
            success: 'Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.',
            showLogin: true
        });

    } catch (err) {
        console.log('Error creating user:', err);
        return res.render('login', {
            title: "Register",
            error: 'Lỗi khi tạo tài khoản: ' + err.message,
            showSignup: true
        });
    }
};
