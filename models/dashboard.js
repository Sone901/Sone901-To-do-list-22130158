const mongoose = require('mongoose');
const date = new Date();
const currentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
const currentDate = date.getDate() + " " + getMonth(date.getMonth()) + " " + date.getFullYear();
console.log(currentDate);


function getMonth(monthNumber) {
    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthsArr[monthNumber];

}

const dashboardSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required: true
    },
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    currenttime: {
        type: String,
        default: currentTime
    },
    currentDate: { 
        type: String,
        default: currentDate
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: false
    },
    categoryChoosed: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);
module.exports = Dashboard;
