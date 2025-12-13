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
        const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
        
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        
        // Update user avatar
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { profilePicture: avatarUrl },
            { new: true }
        );
        
        console.log('Avatar updated:', avatarUrl);
        return res.json({ 
            success: true, 
            message: 'Avatar updated successfully',
            profilePicture: updatedUser.profilePicture 
        });
    } catch (err) {
        console.log('Error updating avatar:', err);
        return res.status(500).json({ error: 'Error updating avatar' });
    }
};
