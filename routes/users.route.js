const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');


//User Signup post route
router.post('/signup', user_controller.user_signup)
// User Login post Route
router.post('/login', user_controller.user_login)


//Getting into Dashboard form first it will run redirectLogin function(if Session not exist it will redirect to login form)
 //then after redirectLogin function it will run dashboard function(if session exist redirect to dashboard)
router.get('/dashboard', user_controller.redirectLogin, user_controller.dashboard)

module.exports = router;
