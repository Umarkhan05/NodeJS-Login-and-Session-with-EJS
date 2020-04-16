var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/', function(req, res, next) {
  res.render('./main/main.ejs');
});

router.get('/login', function(req, res, next) {
  res.render('./auth/login.ejs');
});
router.get('/signup', function(req, res, next) {
  res.render('./auth/signup.ejs');
});





module.exports = router;
