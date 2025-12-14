module.exports.googleAuth = (req, res) => {
    // Passport handles the authentication
    res.redirect('/dashboard');
};

module.exports.googleCallback = (req, res) => {
    if (req.user) {
        const { generateToken, setAuthCookie } = require('../middleware/auth');
        const token = generateToken(req.user._id);
        setAuthCookie(res, token);
        console.log('Google OAuth user logged in:', req.user.email);
        res.redirect('/dashboard');
    } else {
        res.redirect('/register');
    }
};

module.exports.logout = (req, res) => {
    const { clearAuthCookie } = require('../middleware/auth');
    clearAuthCookie(res);
    console.log('User logged out');
    res.redirect('/login');
};
