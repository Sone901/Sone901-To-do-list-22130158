const db = require('../config/mongoose');
const Dashboard = require('../models/dashboard');
const User = require('../models/register');

module.exports.completedtask = async function(req, res){
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.redirect('/login');
        }

        // Get all completed tasks for current user
        const completedTasks = await Dashboard.find({
            userId: req.user._id,
            completed: true
        }).sort({ currentDate: -1 });

        // Get user info
        const user = await User.findById(req.user._id);

        // Calculate stats
        const allTasks = await Dashboard.find({ userId: req.user._id });
        const totalTasks = allTasks.length;
        const pendingTasks = allTasks.filter(task => !task.completed).length;

        console.log(`Completed tasks for user: ${user.name}`);

        // Generate avatar from MultiAvatar if no profile picture
        const userImage = user.profilePicture || `https://api.multiavatar.com/${user.email}.svg`;

        return res.render('completedtask', {
            title: "Completed Tasks",
            name: user.name,
            dashboard: completedTasks,
            totalTasks: totalTasks,
            completedCount: completedTasks.length,
            pendingCount: pendingTasks,
            userImage: userImage
        });
    } catch (err) {
        console.log('Error:', err);
        return res.status(500).send('Error loading completed tasks');
    }
};
