const controller = require('app/controllers/controller');

class adminController extends controller {


    async index(req , res) {

        
        console.log(req.isAuthenticated());
        res.render("admin/home",{pageTitle:"صفحه اصلی"})

    }



}




module.exports = new adminController();