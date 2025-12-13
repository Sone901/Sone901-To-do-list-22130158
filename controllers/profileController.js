const User = require('../models/register');

module.exports.profile = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect('/login');
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.redirect('/login');
        }

        res.render('profile', {
            title: 'Profile',
            name: user.name || 'User',
            email: user.email,
            userImage: user.profilePicture || `https://api.multiavatar.com/${user.email}.svg`,
            user: user
        });
    } catch (err) {
        console.log('Error in profile:', err);
        res.redirect('/login');
    }
};

module.exports.updateProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send('Not authenticated');
        }

        const { name, email, imageUrl } = req.body;

        // Validate input
        if (!name || !email) {
            return res.status(400).send('Name and email are required');
        }

        // Check if email is already used by another user
        if (email !== req.user.email) {
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(400).send('Email already in use');
            }
        }

        // Prepare update object
        const updateData = {
            name: name,
            email: email
        };

        // If image URL is provided, use it
        if (imageUrl && imageUrl.trim()) {
            updateData.profilePicture = imageUrl;
        }

        // If file is uploaded, use that instead
        if (req.file) {
            // Store file path or URL
            const imagePath = `/uploads/${req.file.filename}`;
            updateData.profilePicture = imagePath;
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        console.log('Profile updated successfully:', updatedUser);
        res.redirect('/profile');
    } catch (err) {
        console.log('Error updating profile:', err);
        res.status(500).send('Error updating profile');
    }
};
