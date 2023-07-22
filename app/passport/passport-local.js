const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('models/user');


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
   
passport.deserializeUser(async function(id, done) {
    User.findById(id).then( async function (user, err) {
        if (err) { return done(err); }
        return done(null,user);
    });


});


passport.use('local.register' , new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
} , (req , email ,  password , done) => {
    User.findOne({ 'email' : email }).then( async function (user) {
        // if(err) return done(err);
        if(user) return done(null , false , req.flash('errors' , 'چنین کاربری قبلا در سایت ثبت نام کرده است'));
        
        // const newUser = new User({
        //     name : req.body.name,
        //     username : req.body.username,
        //     email,
        //     password
        // });

        // newUser.save(err => {
        //     if(err) return done(err , false , req.flash('errors' , 'ثبت نام با موفقیت انجام نشد لطفا دوباره سعی کنید'));
        //     done(null , newUser);
        // })

        const newUser = await User.create({
            name : req.body.name,
            username : req.body.username,
            email,
            password
          });

          done(null , newUser);
        

    })
}))


passport.use('local.login' , new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
} , (req , email ,  password , done) => {
    console.log('hi1');

    User.findOne({ 'email' : email }).then( async function (user,err) {
        // console.log(err,user);
        if(err) return done(err);

        if(! user || ! user.password == password) {
            return done(null , false , req.flash('errors' , 'اطلاعات وارد شده مطابقت ندارد'));
        }

        console.log('hi12');
        done(null , user);
    });
}))