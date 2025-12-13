const db = require('../config/mongoose');
const Dashboard = require('../models/dashboard');
const User = require('../models/register');

module.exports.dashboard = async function(req, res){
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.redirect('/login');
        }

        // Get all tasks for current user (pending + completed)
        const allTasks = await Dashboard.find({ userId: req.user._id }).sort({ currentDate: -1 });

        // Get user info
        const user = await User.findById(req.user._id);

        // Calculate stats
        const completedCount = allTasks.filter(task => task.completed).length;
        const pendingCount = allTasks.filter(task => !task.completed).length;

        console.log(`Dashboard loaded for user: ${user.name}`);

        // Generate avatar from MultiAvatar if no profile picture
        const userImage = user.profilePicture || `https://api.multiavatar.com/${user.email}.svg`;

        return res.render('dashboard', {
            title: "Dashboard",
            name: user.name,
            dashboard: allTasks,
            userImage: userImage,
            totalTasks: allTasks.length,
            completedCount: completedCount,
            pendingCount: pendingCount
        });
    } catch (err) {
        console.log('Error:', err);
        return res.status(500).send('Error loading dashboard');
    }
};
