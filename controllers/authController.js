module.exports.googleAuth = (req, res) => {
    // Passport handles the authentication
    res.redirect('/dashboard');
};

module.exports.googleCallback = (req, res) => {
    if (req.user) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/register');
    }
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log('Logout error:', err);
            return res.redirect('/login');
        }
        req.session.destroy((err) => {
            if (err) {
                console.log('Session destroy error:', err);
                return res.redirect('/login');
            }
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    });
};
