const express = require('express');
const port = process.env.PORT || 4000;
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// require the mongoose file
const db = require('./config/mongoose');
require('./config/passport'); // Passport config for Google OAuth
const User = require('./models/register');
const Dashboard = require('./models/dashboard');
const { verifyToken } = require('./middleware/auth');

const app = express();

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set up the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Initialize Passport for Google OAuth only (no session)
app.use(passport.initialize());

// Serve uploaded files and static assets
app.use('/uploads', express.static(path.join(__dirname, 'assets/uploads')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// path: routes\index.js
app.get('/', require('./routes'));
app.get('/login', require('./routes'));
app.post('/login', require('./routes'));
app.get('/dashboard', require('./routes'));
app.get('/register', require('./routes'));
app.post('/register', require('./routes'));
app.get('/completedtask', require('./routes'));
app.get('/profile', require('./routes'));
app.post('/profile/update', require('./routes'));

// Google Authentication Routes
const authController = require('./controllers/authController');
app.get('/auth/google', passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
}));
app.get('/auth/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/register',
        session: false 
    }), 
    authController.googleCallback
);
app.get('/logout', authController.logout);

// adding the task to the database
app.post('/addtask', verifyToken, function(req,res){
    Dashboard.create({
        userId: req.user._id,
        task : req.body.task,
        date : req.body.date,
        description : req.body.description,
        time : req.body.time,
        categoryChoosed : req.body.categoryChoosed
    })
    .then(newTask => {
        console.log("Successfully Created Task!", newTask);
        res.redirect('back');
    })
    .catch(err => {
        console.log("Error Creating Task!!", err);
        res.redirect('back');
    });
});

// complate the task to the database
app.get('/complete-task', verifyToken, function(req,res){
    let id = req.query.id;
    // Verify task belongs to user before updating
    Dashboard.findById(id).then(task => {
        if (!task || task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send('Unauthorized');
        }
        
        Dashboard.findByIdAndUpdate(id, {completed: true})
        .then(newTask => {
            console.log("Successfully Complated Task!", newTask);
            res.redirect('back');
        })
        .catch(err => {
            console.log("Error Complating Task!!", err);
            res.redirect('back');
        });
    }).catch(err => {
        console.log("Error finding task!!", err);
        res.redirect('back');
    });
});


// deleting the task to the database
app.get('/delete-task', verifyToken, function(req,res){
    let id = req.query.id;
    // Verify task belongs to user before deleting
    Dashboard.findById(id).then(task => {
        if (!task || task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send('Unauthorized');
        }
        
        Dashboard.findByIdAndDelete(id)
        .then(newTask => {
            console.log("Successfully Deleted Task!", newTask);
            res.redirect('back');
        })
        .catch(err => {
            console.log("Error Deleting Task!!", err);
            res.redirect('back');
        });
    }).catch(err => {
        console.log("Error finding task!!", err);
        res.redirect('back');
    });
});

// update the task to the database
app.post('/update-task', verifyToken, function(req,res){
    let id = req.body.taskId;
    // Verify task belongs to user before updating
    Dashboard.findById(id).then(task => {
        if (!task || task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send('Unauthorized');
        }
        
        let updateData = {
            task: req.body.task,
            description: req.body.description,
            date: req.body.date,
            categoryChoosed: req.body.categoryChoosed,
            time: req.body.time
        };

        Dashboard.findByIdAndUpdate(id, updateData, {new: true})
        .then(updatedTask => {
            console.log("Successfully Updated Task!", updatedTask);
            res.redirect('back');
        })
        .catch(err => {
            console.log("Error Updating Task!!", err);
            res.redirect('back');
        });
    }).catch(err => {
        console.log("Error finding task!!", err);
        res.redirect('back');
    });
});


app.listen(port,(err) => {
    if (err) {
        console.log(`Error: ${err}`);
    }
    console.log(`Yupp! Server is running on port ${port}`);
});

// Export for Vercel serverless
module.exports = app;