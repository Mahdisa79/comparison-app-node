const express = require('express');
const app = express();
const expressEjsLayouts = require("express-ejs-layouts");
const http = require('http');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const rememberLogin = require('app/middleware/rememberLogin');

const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Helpers =  require('app/helpers');
const methodOverride = require('method-override');



module.exports = class Application {
    constructor() {


        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setupLayoutSetting();
       
        this.setRouters();
    

    }

    setConfig(){

        require('app/passport/passport-local');

        //bodyParser
        app.use(express.urlencoded({extended:false}));
        app.use(express.json());
        app.use(methodOverride('_method'));


        app.use(session({
            name : 'mehdi_sadeghi',
            secret : process.env.SESSION_SECRETKEY,
            resave : true,
            saveUninitialized : true,
            cookie : {  expires : new Date(Date.now() + 1000 * 60 * 60 * 6)},
        }));
        app.use(cookieParser(process.env.COOKIE_SECRETKEY));
        app.use(flash());

        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handle);
        

        app.use((req , res , next) => {
            app.locals = new Helpers(req, res).getObjects();
            next();
        });


    }

    setupLayoutSetting(){
        app.use(express.static("public"));
        app.use(expressEjsLayouts);
        app.set("view engine", "ejs");
        app.set("views", "views");
        app.set("layout", "admin/layouts/masterLayout");
    } 


    setupExpress() {
        const server = http.createServer(app);
        server.listen(config.port , () => console.log(`Listening on port ${config.port}`));

    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url , { useNewUrlParser: true });
    }

    setRouters(){
        app.use('/admin',require('routes/admin'));
        app.use(require('routes/auth'));

    }

}