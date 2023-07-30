const controller = require('app/controllers/controller');

const Car = require("models/Car");
const Compare = require("models/compare");
const User = require("models/user");






class CompareController extends controller {

    async compareList(req , res)
    {
        if( req.isAuthenticated() ){
            let user = await User.findById(req.user.id).populate([
                {
                    path : 'cars',
                    options : { sort : { number : 1} },    
                    populate : [
                        {
                            path : 'car',
                            populate : [
                                {
                                    path : 'category',
                                    select : 'persian_name'
                                } ,
                                {
                                  path : 'brand',
                                  select : 'persian_name'
                                }
                   
                            ]

                        }, 
                    ]


                }
            ]);

            let cars = user.cars;
            console.log(cars,user);
            res.render("home/compare/index",{pageTitle:"مقایسه محصولات",user,cars})
        }
        else{
            this.back(req,res);
        }
        
    }

    async addToCompareList(req , res){
        // console.log("addToCompareList");

        let car = await Car.findById(req.params.id);

        // let car = await Car.findById(req.user.id)

        if( req.isAuthenticated() ){

            let user = await User.findById(req.user.id).populate([
                {
                    path : 'cars',
                    options : { sort : { number : 1} },    
                    populate : [
                        {
                            path : 'car',
                        }, 
                    ]
                }
            ]);


        let userCompareList = user.cars;

            if(! userCompareList.find(function(e){ if(e.car.id == car.id) return true})){

                if(userCompareList.length < 4 ){

                    await Compare.create({
                        user:user._id,
                        car:car._id
                      });
                      return res.json(1);
                }

                //user have 4 or more car in compare list
                else{
                    // console.log('hi2');
                    return res.json(4);
                }
            }
            //user have this car in compare list before that
            else{
                return res.json(3);
            }
       
        }
        //user dont login
        else{
        return res.json(2);
        }
    }

    async removeFromCompareList(req,res){

        let car = await Car.findById(req.params.id);

        if( req.isAuthenticated() ){

            let user = await User.findById(req.user.id).populate([
                {
                    path : 'cars',
                    options : { sort : { number : 1} },    
                    populate : [
                        {
                            path : 'car',
                        }, 
                    ]
                }
            ]); 
            let userCompareList = user.cars;
            if(userCompareList.find(function(e){ if(e.car.id == car.id) return true})){

                userCompareList.find( async function(e){ 
                    if(e.car.id == car.id) {           
                        // delete car from compare list      
                        await e.deleteOne();
                        return res.json(1);
                    }
                
                })

            }
 
            // let nUser = await User.findById(req.user.id).populate([
            //     {
            //         path : 'cars',
            //         options : { sort : { number : 1} },    
            //         populate : [
            //             {
            //                 path : 'car',
            //             }, 
            //         ]
            //     }
            // ]); 

            // $html = view('customer.layouts.compare-table',compact(['compares']))->render();
            // let html = res.render("home/compare/compare-table",{'user' : nUser})
            // return res.json({'html': html});
            // return res.redirect("/compare-list");

        }
        //user dont login
        else{
        return res.json(2);
        }

    }

}




module.exports = new CompareController();