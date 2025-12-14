const User = require('../models/register');

// DiceBear avatar styles
const avatarStyles = [
    'adventurer',
    'adventurer-neutral',
    'avataaars',
    'avataaars-neutral',
    'big-ears',
    'big-ears-neutral',
    'big-smile',
    'bottts',
    'bottts-neutral',
    'croodles',
    'croodles-neutral',
    'faces',
    'fun-emoji',
    'glass',
    'icons',
    'identicon',
    'initials',
    'lorelei',
    'micah',
    'miniavs',
    'notionists',
    'notionists-neutral',
    'open-peeps',
    'personas',
    'pixel-art',
    'pixel-art-neutral',
    'rings',
    'shapes',
    'thumbs',
];

module.exports.getAvatarStyles = (req, res) => {
    return res.json(avatarStyles);
};

module.exports.generateAvatar = (req, res) => {
    const { style, seed } = req.query;
    
    if (!style || !seed) {
        return res.status(400).json({ error: 'Style and seed are required' });
    }
    
    // Validate style
    if (!avatarStyles.includes(style)) {
        return res.status(400).json({ error: 'Invalid style' });
    }
    
    const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
    return res.json({ url: avatarUrl });
};

module.exports.setUserAvatar = async (req, res) => {
    try {
        const { style, seed } = req.body;
        
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        if (!style || !seed) {
            return res.status(400).json({ error: 'Style and seed are required' });
        }
        
        const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
        
        // Update user avatar - use _id not id
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { profilePicture: avatarUrl },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        console.log('Avatar updated for user:', updatedUser.email, '- URL:', avatarUrl);
        return res.json({ 
            success: true, 
            message: 'Avatar updated successfully',
            profilePicture: updatedUser.profilePicture 
        });
    } catch (err) {
        console.error('Error updating avatar:', err);
        return res.status(500).json({ error: 'Error updating avatar: ' + err.message });
    }
};
