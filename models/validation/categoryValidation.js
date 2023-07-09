const Yup = require("yup");

exports.categorySchemaValidation = Yup.object().shape({
    persian_name:Yup.string().required("عنوان دسته باید وارد شود").min(3,"عنوان دسته حداقل 3 کاراکتر است").max(256,"عنوان دسته حداکثر 256 کاراکتر است"),
    original_name:Yup.string().required("عنوان دسته باید وارد شود").min(3,"عنوان دسته حداقل 3 کاراکتر است").max(256,"عنوان دسته حداکثر 256 کاراکتر است"),
    slug:Yup.string().required(" اسلاگ باید وارد شود").min(3," اسلاگ حداقل 3 کاراکتر است").max(256," اسلاگ حداکثر 256 کاراکتر است"),
    status:Yup.string("باید استرینگ باشد").required("ضروری است")
});
