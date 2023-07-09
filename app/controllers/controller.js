const autoBind = require('auto-bind');

module.exports = class controller {

    constructor() {
        autoBind(this);
        // console.log('main controller');

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
            timer = data.timer || null;

        req.flash('sweetalert' , { title , message , icon , button , timer});
        
    }

    alertAndBack(req, res , data) {
        this.alert(req , data);
        this.back(req , res);
    }


};