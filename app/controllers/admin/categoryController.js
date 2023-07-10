const controller = require('app/controllers/controller');
const Category = require("models/category");

class categoryController extends controller {


    async index(req , res) {

        // res.render("admin/categories/index",{pageTitle:"دسته بندی ها"})

        try {
            let categories = await Category.find({});


            res.render('admin/categories/index',  { pageTitle : 'دسته بندی ها"' , categories });
        } catch (err) {
            next(err);
        }

    }

    async create(req , res) {
        
        res.render("admin/categories/create",{pageTitle:"ساخت دسته بندی جدید"})

    }

    async store(req , res , next) {
        
        const errorArr = [];

        try {
            await Category.categoryValidation(req.body);
            let { persian_name, original_name, slug ,status } = req.body;

            slug = this.persianSlug(slug)

            // console.log(persianSlug);
            // slug = persianSlug.persianSlug(slug)
            



            const category = await Category.findOne({slug});

            if(category){
             
                errorArr.push({
                  name: "اسلاگ تکراری",
                  message: "اسلاگ تکراری وارد کرده اید",
                });
           
          
              this.alert(req, {
                title: "خطا",
                message: errorArr[0].message,
                icon: "error",
                button: "تایید",
              });
          
              return res.redirect("/admin/categories/create");
            //  return;
            }


            await Category.create({
                persian_name,
                original_name,
                slug,
                status
              });

              this.alert(req, {
                title: "موفقیت آمیز",
                message: "دسته بندی شما با موفقیت ایجاد شد" ,
                icon: "success",
                button: "تایید",
              });

            res.redirect('/admin/categories'); 
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




module.exports = new categoryController();