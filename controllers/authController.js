module.exports.googleAuth = (req, res) => {
    // Passport handles the authentication
    res.redirect('/dashboard');
};

module.exports.googleCallback = (req, res) => {
    try {
        if (req.user) {
            const { generateToken, setAuthCookie } = require('../middleware/auth');
            const token = generateToken(req.user._id);
            setAuthCookie(res, token);
            console.log('Google OAuth user logged in:', req.user.email);
            return res.redirect('/dashboard');
        } else {
            console.log('No user found in Google OAuth callback');
            return res.redirect('/register');
        }
    } catch (err) {
        console.error('Google OAuth callback error:', err);
        return res.status(500).send('Authentication error: ' + err.message);
    }
};

module.exports.logout = (req, res) => {
    const { clearAuthCookie } = require('../middleware/auth');
    clearAuthCookie(res);
    console.log('User logged out');
    res.redirect('/login');
};
