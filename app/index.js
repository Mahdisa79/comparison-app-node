const express = require('express');
const app = express();
const expressEjsLayouts = require("express-ejs-layouts");
const http = require('http');
const mongoose = require('mongoose');


module.exports = class Application {
    constructor() {


        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setupLayoutSetting();
       
        this.setRouters();
    

    }

    setConfig(){

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
        app.use(require('routes/admin'));
    }

}