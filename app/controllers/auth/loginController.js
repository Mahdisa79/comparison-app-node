const controller = require('app/controllers/controller');
var svgCaptcha = require('svg-captcha');

class loginController extends controller {

    showLoginForm(req , res) {
    
            var captcha = this.createCapcha();
            req.session.captcha = captcha.text;

            // console.log(req.session);


            const title = 'صفحه ورود';
            res.render('auth/login' , { title,showCap:captcha.data });
    }

    async loginProccess(req  ,res , next) {
        // await this.recaptchaValidation(req , res);
        // let result = await this.validationData(req)
        // if(result) {
        //     return this.login(req, res , next)
        // } 
        req.flash("formData", req.body);   
        this.back(req,res);
    }





}




module.exports = new loginController();