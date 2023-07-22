const middleware = require('./middleware');

class checkCapcha extends middleware {
    
    handle(req , res ,next) {

        const errorArr = [];

        var userCap = req.body.captcha;
        var currCCap = req.session.captcha;

        if(userCap == currCCap){
            console.log("ok !");
            next();
            
        }
        else{
            errorArr.push({
                name: "capcha",
                message: "در وارد کردن کد دقت کنید",
              });
    
            req.flash('errors',errorArr);
            res.redirect("/login");
        }

    }


}


module.exports = new checkCapcha();