const Yup = require("yup");

exports.brandSchemaValidation = Yup.object().shape({
    persian_name:Yup.string().required("عنوان دسته باید وارد شود").min(3,"عنوان دسته حداقل 3 کاراکتر است").max(256,"عنوان دسته حداکثر 256 کاراکتر است"),
    original_name:Yup.string().required("عنوان دسته باید وارد شود").min(3,"عنوان دسته حداقل 3 کاراکتر است").max(256,"عنوان دسته حداکثر 256 کاراکتر است"),
    logo:Yup.object().shape({
        filename: Yup.string().required("عکس لوگو باید وارد شود"),
        path: Yup.string().required("آدرس تصویر مشکل دارد"),
        size: Yup.number().max(3000000, "عکس لوگو حداکثر باید 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(
          ["image/jpeg", "image/png"],
          "تنها jpeg و png پشتیبانی می شود"
        ),
      }),
    status:Yup.string("باید استرینگ باشد").required("ضروری است")
});
