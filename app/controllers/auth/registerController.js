const controller = require('app/controllers/controller');
var svgCaptcha = require('svg-captcha');

const passport = require('passport');
const User = require("models/user");


class registerController extends controller {

    showRegisterForm(req , res) {
    
            var captcha = this.createCapcha();
            req.session.captcha = captcha.text;

            // console.log(req.session);


            const title = 'صفحه ورود';
            res.render('auth/register' , { title,showCap:captcha.data });
    }

    async registerProccess(req  ,res , next) {

        const errorArr = [];

        try {
            await User.registerValidation(req.body)
            return this.registerUser(req, res , next)
           
        } catch (err) {
            err.inner.forEach((e) => {
                errorArr.push({
                  name: e.path,
                  message: e.message,
                });
              });
          
            req.flash('errors',errorArr);
            this.back(req,res)            
        }


    }

    registerUser(req , res , next) {
        
        passport.authenticate('local.register' , { 
            successRedirect : '/admin',
            failureRedirect : '/register',
            failureFlash : true
        })(req, res , next);
    }





}




module.exports = new registerController();