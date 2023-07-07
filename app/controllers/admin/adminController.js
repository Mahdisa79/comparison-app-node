const controller = require('app/controllers/controller');

class adminController extends controller {


    async index(req , res) {
        console.log('you are at index now');

        res.render("home",{pageTitle:"صفحه اصلی"})

    }


}




module.exports = new adminController();