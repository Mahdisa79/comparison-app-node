const controller = require('app/controllers/controller');
const Brand = require("models/brand");
const fs = require('fs');
const { log } = require('console');

class brandController extends controller {


    async index(req , res) {

        try {
            let brands = await Brand.find({});

            // console.log(brands[0].getImage('480'));
            // Object.keys(firstObj)[0]
            // console.log(brands[0].logo.path[480]);
            res.render('admin/brands/index',  { pageTitle : 'برند ها' ,brands });

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

        let brand = await Brand.findById(req.params.id);

        if( ! brand ) this.error('چنین دسته ای وجود ندارد' , 404);
        
        res.render("admin/brands/edit",{pageTitle:"ویرایش برند",brand})
    
      } catch (err) {
      next(err);
    }
  }

  async update(req , res) {
    const errorArr = [];
    try {
      const brand = await Brand.findById(req.params.id);


      if(req.query._method === 'put' && req.body.image === undefined) {
        //dont upload new image
        req.body.logo = brand.logo;
      }
      else{
        console.log(Object.values(brand.logo.path).length > 0);
        // upload new image
        if(Object.values(brand.logo.path).length > 0){
          Object.values(brand.logo.path).forEach(image => fs.unlinkSync(`./public${image}`));          
        }

        req.body.logo = req.body.image;
        req.body.logo.path= this.imageResize(req.file);
      }

  
      await Brand.brandValidation(req.body);
      let { persian_name, original_name, logo ,status } = req.body;


      brand.persian_name = persian_name;
      brand.original_name = original_name;
      brand.logo = logo;
      brand.status = status;

      await brand.save();

      this.alert(req, {
        title: "موفقیت آمیز",
        message: "دسته بندی شما با موفقیت ویرایش شد" ,
        icon: "success",
        button: "تایید",
      });
  
      res.redirect("/admin/brands");
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

          let brand = await Brand.findById(req.params.id);
          if( ! brand ) this.error('چنین دسته ای وجود ندارد' , 404);


        // delete Images
        Object.values(brand.logo.path).forEach(image => fs.unlinkSync(`./public${image}`));

        // delete brand
        await brand.deleteOne();

        return res.redirect('/admin/brands');
      } catch (err) {
          next(err);
      }
  }

}




module.exports = new brandController();