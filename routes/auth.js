const express = require('express');
const router = express.Router();
const checkCapcha = require("app/middleware/checkCapcha")


const loginController = require('app/controllers/auth/loginController');
const registerController = require('app/controllers/auth/registerController');


router.use((req , res , next) => {
    res.locals.layout = "auth/master";
    next();
})



// show login form
router.get( "/login",loginController.showLoginForm);
router.post( "/login",checkCapcha.handle,loginController.loginProccess);

// show login form
router.get( "/register",registerController.showRegisterForm);
router.post( "/register",registerController.registerProccess);


router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.clearCookie('remember_token');
      res.redirect('/admin');   
     });
  });



module.exports = router;