const Yup = require("yup");

exports.userLoginSchemaValidation = Yup.object().shape({
    email:Yup.string().required("نام کاربری یا ایمیل ضروری است"),
    password:Yup.string().required("رمز ورود ضروری است"),
});
