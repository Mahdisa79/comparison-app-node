const autoBind = require('auto-bind');
const isMongoId = require('validator/lib/isMongoId');
const path = require('path');
const sharp = require('sharp');
var svgCaptcha = require('svg-captcha');

module.exports = class controller {

    constructor() {
        autoBind(this);
        // console.log('main controller');

    }

    createCapcha(req , res) {

        var captcha = svgCaptcha.create({
            charPreset:"123456789",
            width:250,
            size:5,
            color: true,
            noise: 2
         });

         return captcha;

    }


    async validationData(req) {
        // const result = validationResult(req);
        // if (! result.isEmpty()) {
        //     const errors = result.array();
        //     const messages = [];
           
        //     errors.forEach(err => messages.push(err.msg));

        //     req.flash('errors' , messages)

        //     return false;
        // }

        return true;
    }

    isMongoId(paramId) {
        if(! isMongoId(paramId))
            this.error('ای دی وارد شده صحیح نیست', 404);
    }

    back(req , res) {
        req.flash('formData' , req.body);
        return res.redirect(req.header('Referer') || '/');
    }

    slug(title) {

        console.log(title);
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }


    persianSlug=(titleStr)=>{
        titleStr = titleStr.replace(/^\s+|\s+$/g, '');
        titleStr = titleStr.toLowerCase();
       //persian support
        titleStr = titleStr.replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '') 
        // Collapse whitespace and replace by -
            .replace(/\s+/g, '-')
            // Collapse dashes
            .replace(/-+/g, '-');
        return titleStr;       
    }

    alert(req , data) {
        let title = data.title || '',
            message = data.message || '',
            icon = data.icon || 'info',
            button = data.button || null,
            timer = data.timer || null,
            used = 0;


        req.flash('sweetalert' , { title , message , icon , button , timer,used});
        
    }

    alertAndBack(req, res , data) {
        this.alert(req , data);
        this.back(req , res);
    }

    imageResize(image) {
        const imageInfo = path.parse(image.path);
        
        let addresImages = {};
        addresImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);

        const resize = size => {
            let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;
            
            addresImages[size] = this.getUrlImage(`${image.destination}/${imageName}`);
            
            sharp(image.path)
                .resize(size , null) 
                .toFile(`${image.destination}/${imageName}`);
        }

        [1080 , 720 , 480].map(resize);

        return addresImages;
    }

    getUrlImage(dir) {
        return dir.substring(8);
    }

};