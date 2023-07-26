const controller = require('app/controllers/controller');
const Brand = require("models/brand");
const Car = require("models/Car");


class homeController extends controller {


    async index(req , res) {

        
        console.log(req.isAuthenticated());
        let brands = await Brand.find({});
        let cars = await Car.find({}).populate([
            {
                path : 'category',
                select : 'persian_name'
            } ,
            {
              path : 'brand',
              select : 'persian_name'
            }
        ]);

        res.render("home/home",{pageTitle:"صفحه اصلی",brands,cars})

    }



}




module.exports = new homeController();