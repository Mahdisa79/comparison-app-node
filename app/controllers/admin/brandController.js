const controller = require('app/controllers/controller');
const Brand = require("models/brand");

class brandController extends controller {


    async index(req , res) {

        try {
            // let categories = await Category.find({});


            res.render('admin/brands/index',  { pageTitle : 'برند ها'  });
        } catch (err) {
            next(err);
        }

    }

    async create(req , res) {
        
        res.render("admin/brands/create",{pageTitle:"ساخت برند جدید"})

    }

    async store(req , res , next) {
        
        const errorArr = [];

        try {
            req.body.logo = req.body.image;

            await Brand.brandValidation(req.body);
            let { persian_name, original_name, logo ,status } = req.body;
            

             // create brand
            logo.path= this.imageResize(req.file);

            console.log(logo);

            await Brand.create({
                persian_name,
                original_name,
                logo,
                status
              });

              this.alert(req, {
                title: "موفقیت آمیز",
                message: "برند شما با موفقیت ایجاد شد" ,
                icon: "success",
                button: "تایید",
              });

            res.redirect('/admin/brands'); 
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




module.exports = new brandController();