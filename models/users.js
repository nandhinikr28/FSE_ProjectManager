const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    User_ID:{
        type: mongoose.Schema.ObjectId, ref: 'User',
        required: false 
    },
    First_name:{
        type: String,
        required: true
    },
    Last_name:{
        type: String,
        required: true
    },
    Employee_ID:{
        type: Number,
        required: true
    },
    Project_ID:{
        type: mongoose.Schema.ObjectId, ref: 'Project',
        required: false
    },
    Task_ID:{
        type: mongoose.Schema.ObjectId, ref: 'Task',
        required: false
    }
   
});

const User = module.exports = mongoose.model('User',UserSchema);