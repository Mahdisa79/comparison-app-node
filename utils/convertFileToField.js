class convertFileToField {

    handle(req , res , next) {
        console.log(req.file ,req.body );
        if(! req.file) 
            req.body.image = undefined;
        else

            req.body.image = {filename:req.file.filename,mimetype:req.file.mimetype,path:req.file.path,size:req.file.size};
        next();
    }
}


module.exports = new convertFileToField();