const path = require('path');
const autoBind = require('auto-bind');
const User = require("models/user");


// const moment = require('moment-jalaali');
// moment.loadPersian({usePersianDigits: true})

module.exports = class Helpers {
    
    constructor(req , res) {
        autoBind(this);
        // console.log(req.query._method);
        this.req = req;
        this.res = res;
        this.formData = req.flash('formData')[0];
    }

    getObjects() {        
        return {
            auth : this.auth(),
            viewPath : this.viewPath,
            ...this.getGlobalVaribales(),
            old : this.old,
            getCarCount : this.getCarCount,

            // date : this.date,
            req : this.req
        }
    }

    auth() {
        return {
            check : this.req.isAuthenticated(),
            user : this.req.user
        }
    }

    viewPath(dir) {
        return path.resolve(path.resolve('./views') + '/' + dir);
    }

    getGlobalVaribales() {
        return {
            errors : this.req.flash('errors')
        }
    }

    // async getCarCount(id){

    // getCarCount =  function (id) {
    //     // return 5;
    //     // async function {
    //     ((async (id) => {
        

    //     let user =  await User.findById(id).populate([
    //         {
                
    //             path : 'cars',
    //             options : { sort : { number : 1} },    
    //             populate : [
    //                 {
    //                     path : 'car',
    //                 }, 
    //             ]
    //         }
    //     ]); 

    //     // return 5;
    //     })())

    //     return 5;
    // // }

    //     // return id;
    //     // resolve(id) //
    //     // return user.email;

    // }

    old(field , defaultValue = '') {
        return this.formData && this.formData.hasOwnProperty(field) ? this.formData[field] : defaultValue;
    }

    // date(time) {
    //     return moment(time);
    // }
}