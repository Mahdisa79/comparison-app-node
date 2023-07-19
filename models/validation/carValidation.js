const Yup = require("yup");

let  validationShape ;  

validationShape = {
    name:Yup.string().required("نام خودرو باید وارد شود").min(3,"نام خودرو باید حداقل 3 کاراکتر است").max(256,"عنوان دسته حداکثر 256 کاراکتر است"),
    category:Yup.string().required("عنوان دسته باید وارد شود"),
    brand:Yup.string().required("برند باید وارد شود"),
    image:Yup.object().shape({
        filename: Yup.string().required("عکس لوگو باید وارد شود"),
        path: Yup.mixed("آدرس تصویر مشکل دارد"),
        size: Yup.number().max(3000000, "عکس لوگو حداکثر باید 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(
          ["image/jpeg", "image/png"],
          "تنها jpeg و png پشتیبانی می شود"
        ),
      }),
    color:Yup.string().required("رنگ باید وارد شود"),
    power:Yup.string().required("قدرت باید وارد شود"),  
    price_us:Yup.string().required("قیمت باید وارد شود"),  
    country:Yup.string().required("کشور باید وارد شود"),  
    maxspeed:Yup.string().required("حداکثر سرعت باید وارد شود"),  
    safety_class:Yup.string().required("میزان امنیت باید وارد شود"), 
    fuel_consumption:Yup.string().required("مصرف سوخت باید وارد شود"),  
    acceleration:Yup.string().required("شتاب باید وارد شود"),  
    status:Yup.string("باید استرینگ باشد").required("ضروری است"),
};



exports.carSchemaValidation = Yup.object().shape(validationShape);