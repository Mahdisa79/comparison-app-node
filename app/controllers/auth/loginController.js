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
            console.log(err,user);
            if(!user) return res.redirect('/login');

            console.log('hi2');

            // if(! user.active ) {
            //     // create activationCode
            //     let activeCode = await ActivationCode.find({ user : user.id }).gt('expire' , new Date()).sort({ createdAt : 1}).populate('user').limit(1).exec();
                
            //     if(activeCode.length) {
            //         this.alertAndBack(req , res , {
            //             title : 'توجه کنید',
            //             message : 'لینک فعال سازی اکانت به ایمیل شما ارسال شده برای ارسال دوباره لطفا 10 دقیقه صبر کنید و دوباره اقدام به ورود کنید تا لینک جدید به ایمیل شما ارسال شود',
            //             button : 'بسیار خوب'
            //         });
            //         return;
            //     } else {
            //         let code = uniqueString(); 
            //         let newActiveCode = new ActivationCode({
            //             user : user.id,
            //             code,
            //             expire : Date.now() + 1000 * 60 * 10
            //         });
    
            //         await newActiveCode.save();

            //         let mailOptions = {
            //             from: '"مجله آموزشی راکت " <info@nodejs.roocket.ir>', // sender address
            //             to: `${user.email}`, // list of receivers
            //             subject: 'فعال سازی اکانت راکت', // Subject line
            //             html: `
            //                 <h2>فعال سازی اکانت راکت</h2>
            //                 <p>برای فعال شدن اکانت بر روی لینک زیر کلیک کنید</p>
            //                 <a href="${config.siteurl}/user/activation/${newActiveCode.code}">فعال سازی</a>
            //             ` // html body
            //         };
            
            //         mail.sendMail(mailOptions  , (err , info) => {
            //             if(err) return console.log(err);
            
            //             console.log('Message Sent : %s' , info.messageId);
            
            //             this.alert(req, {
            //                 title : 'دقت کنید',
            //                 message : 'ایمیل حاوی لینک فعال سازی به ایمیل شما ارسال شد',
            //                 type  : 'success',
            //                 button : 'بسیار خوب'
            //             });
            
            //             return res.redirect('/admin');
            
            //         });

            //         return;
            //     }

             
            // }


            req.logIn(user , err => {
                // if(req.body.remember) {
                //     user.setRememberToken(res);
                // }
                console.log('hi4');


                return res.redirect('/admin');
            })

            console.log('hi3');


        })(req, res , next);
    }





}




module.exports = new loginController();