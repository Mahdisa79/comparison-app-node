const controller = require('app/controllers/controller');
var svgCaptcha = require('svg-captcha');
const passport = require('passport');


const User = require("models/user");


class loginController extends controller {

    showLoginForm(req , res) {
    
            var captcha = this.createCapcha();
            req.session.captcha = captcha.text;

            // console.log(req.session);


            const title = 'صفحه ورود';
            res.render('auth/login' , { title,showCap:captcha.data });
    }

    async loginProccess(req  ,res , next) {

        const errorArr = [];

        try {

            await User.loginValidation(req.body)
            return this.login(req, res , next)

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

    
    async login(req ,res , next) {
        passport.authenticate('local.login' ,async (err , user) => {
            if(!user) return res.redirect('/login');

            req.logIn(user , err => {

                if(req.body.remember) {
                    user.setRememberToken(res);
                }
            
                return res.redirect('/admin');
            })



        })(req, res , next);
    }





}




module.exports = new loginController();