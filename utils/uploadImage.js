const multer = require('multer');
const mkdirp  = require('mkdirp');
const fs = require('fs');

const getDirImage = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDay();

    return `./public/uploads/images/${year}/${month}/${day}`;
}


const ImageStorage = multer.diskStorage({
    destination : (req , file , cb ) => {
        let dir = getDirImage();
        

        mkdirp(dir , (err) => cb(null , dir))


    },
    filename : (req , file , cb) => {
        let filePath = getDirImage() + '/' + file.originalname;
        if(!fs.existsSync(filePath)){
            cb(null , file.originalname);
        }
        else{
            cb(null , Date.now() + '-' + file.originalname);
        }

    }
})

const uploadImage = multer({
    
    fileFilter (req, file, cb) {

        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" ){
            cb(null, true)
        }
        else{
            cb(null, false)
        }
      
      },

    storage : ImageStorage,
    
    limits : {
        fileSize : 1024 * 1024 * 10000
    }
});

module.exports = uploadImage;