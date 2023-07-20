const mongoose = require('mongoose');
const fs = require('fs');

const controller = require('app/controllers/controller');

const Car = require("models/Car");
const Brand = require("models/brand");
const Category = require("models/category");



class carController extends controller {


    async index(req , res) {

        // res.render("admin/categories/index",{pageTitle:"دسته بندی ها"})

        try {
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
            res.render('admin/cars/index',  { pageTitle : 'خودرو ها' ,cars });
        } catch (err) {
            next(err);
        }

    }

    async create(req , res) {
        
      let brands = await Brand.find({});
      let categories = await Category.find({});
        

      res.render("admin/cars/create",{pageTitle:"ساخت حودرو جدید",brands,categories})
    }

    async store(req , res , next) {
        
        const errorArr = [];

        try {

          let { name, category, brand ,image,color,power,price_us,country,maxspeed,safety_class,fuel_consumption,acceleration,status } = req.body;
            
          await Car.carValidation(req.body);
          // create brand
          image.path= this.imageResize(req.file);            



            await Car.create({name, category, brand ,image,color,power,price_us,country,maxspeed,safety_class,fuel_consumption,acceleration,status});

              this.alert(req, {
                title: "موفقیت آمیز",
                message: "دسته بندی شما با موفقیت ایجاد شد" ,
                icon: "success",
                button: "تایید",
              });

            res.redirect('/admin/cars'); 
            return ;
           
        } catch(err) {

            err.inner.forEach((e) => {
                errorArr.push({
                  name: e.path,
                  message: e.message,
                });
              });
          
            req.flash("formData", req.body);          
            req.flash('errors',errorArr);
            this.back(req,res)
        
          }
    }

    async edit(req , res) {
      try{
        let brands = await Brand.find({});
        let categories = await Category.find({});
          

        this.isMongoId(req.params.id);

        let car = await Car.findById(req.params.id);
        if( ! car ) this.error('چنین دسته ای وجود ندارد' , 404);
        
        res.render("admin/cars/edit",{pageTitle:"ساخت دسته بندی جدید",car,brands,categories})
    
      } catch (err) {
      next(err);
    }
  }

  async update(req , res) {
   
    const errorArr = [];

    try {
      const car = await Car.findById(req.params.id);

      if(req.query._method === 'put' && req.body.image === undefined) {
        //dont upload new image
        req.body.image = car.image;
      }
      else{
        // upload new image
        if(Object.values(car.image.path).length > 0){
          Object.values(car.image.path).forEach(image => fs.unlinkSync(`./public${image}`));          
        }

        req.body.image = req.body.image;
        req.body.image.path= this.imageResize(req.file);
      }

      await Car.carValidation(req.body);
      let { name, category, brand ,image,color,power,price_us,country,maxspeed,safety_class,fuel_consumption,acceleration,status } = req.body;


      car.name = name;
      car.category = category;
      car.brand = brand;
      car.image = image;
      car.color = color;
      car.power = power;
      car.price_us = price_us;
      car.country = country;
      car.maxspeed = maxspeed;
      car.safety_class = safety_class;
      car.fuel_consumption = fuel_consumption;
      car.acceleration = acceleration;
      car.status = status;



      await car.save();

      this.alert(req, {
        title: "موفقیت آمیز",
        message: "دسته بندی شما با موفقیت ویرایش شد" ,
        icon: "success",
        button: "تایید",
      });
  
      res.redirect("/admin/cars");
      
  
    } catch (err) {
   
      err.inner.forEach((e) => {
        errorArr.push({
          name: e.path,
          message: e.message,
        });
      });
  

      req.flash("formData", req.body);   
      req.flash('errors',errorArr);

  
      res.redirect(req.header("Referer") || "/");
    }
}




    async destroy(req , res , next) {
      try {
        this.isMongoId(req.params.id);

        let car = await Car.findById(req.params.id);
        if( ! car ) this.error('چنین دسته ای وجود ندارد' , 404);


      // delete Images
      Object.values(car.image.path).forEach(image => fs.unlinkSync(`./public${image}`));

      // delete car
      await car.deleteOne();

      return res.redirect('/admin/cars');
      } catch (err) {
          next(err);
      }
  }

}




module.exports = new carController();