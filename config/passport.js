const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/register');
const bcrypt = require('bcryptjs');

// Local Strategy for email/password login
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
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

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
