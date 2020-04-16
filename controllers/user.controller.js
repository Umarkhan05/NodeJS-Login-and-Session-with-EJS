const express = require('express');

const User = require('../models/user.model');


//User Signup function
exports.user_signup = async function(req, res){
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        dateofbirth: req.body.dateofbirth
    });
    try{
        const newUser = await user.save();
        res.redirect('/login');
    }
    catch{
        res.send('Error creating User');
    }

    

}

//Redirect User to login page if session doesn't exist

exports.redirectLogin = (req, res, next) =>{
    if(!req.session.email){
        res.redirect('/login')
    }else{
        next()
    }
}
// Redirect User to Dashboard if session exist
exports.redirectDashboard = (req, res, next) =>{
    if(req.session.email){
        res.redirect('main/dashboard')
    }else{
        next()
    }
}



//User Login function

exports.user_login = (req, res) => {
    const {email, password}= req.body;
    try{
        User.findOne({email:email, password:password}, (err, user) => {
            if(user=== null){
                res.send('Invalid email or User doesnt exist')
            }
            else if(user.email===email && user.password===password){
                req.session.email = email;
                res.render('main/dashboard', {page: 'Dashboard', menuId:'dashboard', session: req.session})
                console.log('Creating a session' +req.session.email)
            }
            else{
                res.send('Invalid Login');
                console.log('Invalid')
            }
        });
    }
    catch(err){
        res.send(err)
    }
}

exports.dashboard=(req,res,next)=>{
    res.render('main/dashboard',{page:'Dashboard',menuId:'dashboard'});
}



exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if(err){
            return console.log(err)
        }
        else{
            console.log('Destroying session')
        }
        res.redirect('/login')
    });
}
