const Yup = require("yup");

exports.userRegisterSchemaValidation = Yup.object().shape({
    name:Yup.string().required("نام ضروری است"),
    username:Yup.string().required("نام کاربری ضروری است"),
    email:Yup.string().required("ایمیل ضروری است"),
    password: Yup.string().required('رمز ورود ضروری است').min(8,'رمز ورود حداقل 8 کاراکتر باید باشد'),
    password_confirmation : Yup.string()
       .oneOf([Yup.ref('password'), null], 'رمز و تایید آن یکسان نیستند'),
    agree_terms:Yup.string().required("تایید قوانین ضروری است"),

});
