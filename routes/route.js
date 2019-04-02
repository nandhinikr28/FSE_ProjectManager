const express = require('express');
const router = express.Router();

const Project = require('../models/projects');
const Task = require('../models/tasks');
const User = require('../models/users');

//retrieve projects
router.get('/projects',(req,res, next)=>{
    Project.find(function(err, projects){
        res.json(projects);
    })    
    //res.send('retrieving the project list');
});

//add projects
router.post('/projects',(req,res,next)=>{
    let project = req.body;
    console.log(project);

    //logic to add projects
    var model = new Project(project);
    model.save(function(err){
        if(err){
            res.send("error"+err);
            return next(err);
        }
        res.send("Project added");
    })
});

//delete project based on id
router.delete('/projects/:id',(req,res,next)=>{
    //logic to delete projects
    console.log("Deleting Project");
    Project.remove({id: req.params.id}, function (err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
});

//update projects
router.put('/projects/:id', function(req,res,next){
    console.log("updating value"+req.params.id);
    Task.findByIdAndUpdate(req.params.id, req.body, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

//retrieve task
router.get('/tasks',(req,res,next)=>{
    Task.find(function(err, tasks){
        res.json(tasks);
    })    
});

//add tasks
router.post('/tasks',(req,res,next)=>{
    let task = req.body;
    console.log(task);

    //logic to add tasks
    var model = new Task(task);
    model.save(function(err){
        if(err){
            res.send("error"+err);
            return next(err);
        }
        res.send("Task added");
    })
});

//delete tasks based on id
router.delete('/tasks/:id',(req,res,next)=>{
    //logic to delete tasks
    console.log("Deleting Task");
    Task.remove({id: req.params.id}, function (err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
});

//update tasks
router.put('/tasks/:id', function(req,res,next){
    console.log("updating value"+req.params.id);
    Task.findByIdAndUpdate(req.params.id, req.body, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});


//retrieve user
router.get('/users',(req,res,next)=>{
    User.find(function(err,users){
        res.json(users);
    })
})

//add user
router.post('/users',(req,res,next)=>{
    let user = req.body;
    console.log(user);

    var model = new User(user);
    model.save(function(err){
        if(err){
            res.send("error"+err);
            return next(err);
        }
        res.send("User added");
    });
});

//delete user based on id
router.delete('/users/:id',(req,res,next)=>{
    console.log("Deleting user");
    User.remove({id: req.params.id}, function (err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

//update user
router.put('/users/:id', function(req,res,next){
    console.log("updating value"+req.params.id);
    Task.findByIdAndUpdate(req.params.id, req.body, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

module.exports = router;