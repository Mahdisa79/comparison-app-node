const mongoose = require('mongoose');

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
            console.log(cars[0].category.persian_name)
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
          console.log(req.body);

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

        this.isMongoId(req.params.id);

        let category = await Category.findById(req.params.id);
        if( ! category ) this.error('چنین دسته ای وجود ندارد' , 404);
        
        res.render("admin/categories/edit",{pageTitle:"ساخت دسته بندی جدید",category})
    
      } catch (err) {
      next(err);
    }
  }

  async update(req , res) {
    const errorArr = [];
    try {

      await Category.categoryValidation(req.body);
      let { persian_name, original_name, slug ,status } = req.body;
      slug = this.persianSlug(slug);

      const category = await Category.findById(req.params.id);
    
      if(category.slug!=slug){
      const oldCategory = await Category.findOne({slug});
      if(oldCategory){
        // err.inner.forEach((e) => {
          errorArr.push({
            name: "اسلاگ تکراری",
            message: "اسلاگ تکراری وارد کرده اید",
          });
        // });
    
        this.alert(req, {
          title: "خطا",
          message: errorArr.message,
          icon: "error",
          button: "تایید",
        });
        req.flash("formData", req.body);
    
        this.back(req,res);
        return;
      }
  
      }
      category.persian_name = persian_name;
      category.original_name = original_name;
      category.status = status;
      category.slug = slug;

      await category.save();

      this.alert(req, {
        title: "موفقیت آمیز",
        message: "دسته بندی شما با موفقیت ویرایش شد" ,
        icon: "success",
        button: "تایید",
      });
  
      res.redirect("/admin/categories");
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

          let category = await Category.findById(req.params.id);
          if( ! category ) this.error('چنین دسته ای وجود ندارد' , 404);


          // delete category
          await category.deleteOne();

          return res.redirect('/admin/categories');
      } catch (err) {
          next(err);
      }
  }

}




module.exports = new carController();