const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/register');

// Google OAuth Strategy - LocalStrategy removed (using JWT now)
// Dynamic callback URL based on environment
const getCallbackURL = () => {
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}/auth/google/callback`;
    }
    if (process.env.NODE_ENV === 'production') {
        return 'https://sone901-to-do-list-22130158.vercel.app/auth/google/callback';
    }
    return 'http://localhost:4000/auth/google/callback';
};

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: getCallbackURL()
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        
        if (user) {
            // Update profile picture if changed
            if (profile.photos[0].value) {
                user.profilePicture = profile.photos[0].value;
                await user.save();
            }
            return done(null, user);
        } else {
            // Create new user from Google profile
            const newUser = await User.create({
                name: profile.given_name || profile.displayName.split(' ')[0],
                lastName: profile.family_name || profile.displayName.split(' ')[1] || '',
                email: profile.emails[0].value,
                googleId: profile.id,
                profilePicture: profile.photos[0].value,
                password: 'google-oauth' // dummy password for OAuth users
            });
            return done(null, newUser);
        }
    } catch (err) {
        return done(err, null);
    }
}));

// Note: serializeUser and deserializeUser removed - using JWT instead of sessions

module.exports = passport;
