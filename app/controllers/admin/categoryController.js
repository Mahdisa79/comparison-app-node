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
          
             res.redirect("/admin/categories/create");
             return;
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
            
 


            return res.redirect('/admin/categories');  
        } catch(err) {

            err.inner.forEach((e) => {
                errorArr.push({
                  name: e.path,
                  message: e.message,
                });
              });
          

            req.flash("oldValue", req.body);          
            req.flash('errors',errorArr);

            this.back(req,res)
       
        }
    }

}




module.exports = new categoryController();