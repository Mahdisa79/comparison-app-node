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
        if(user) return done(null , false , req.flash('errors' , { message :'چنین کاربری قبلا در سایت ثبت نام کرده است'}));
        

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

    User.findOne({ 'email' : email }).then( async function (user,err) {
        // console.log(err,user);
        if(err) return done(err);

        if(! user || ! user.comparePassword(password)) {
                
            return done(null , false , req.flash('errors' , { message : 'اطلاعات وارد شده مطابقت ندارد'}));
        }

        console.log('hi12');
        done(null , user);
    });
}))