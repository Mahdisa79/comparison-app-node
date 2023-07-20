const express = require('express');
const router = express.Router();
const checkCapcha = require("app/middleware/checkCapcha")


const loginController = require('app/controllers/auth/loginController');

router.use((req , res , next) => {
    res.locals.layout = "auth/master";
    next();
})



// show login form
router.get( "/login",loginController.showLoginForm);
router.post( "/login",checkCapcha.handle,loginController.loginProccess);



module.exports = router;