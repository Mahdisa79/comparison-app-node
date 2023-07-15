const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const {brandSchemaValidation} = require('./validation/brandValidation');


const brandSchema = Schema({
    persian_name : { type : String , required : true},
    original_name : { type : String , required : true},
    logo : { type : Schema.Types.Mixed},
    status : { type: String , enum : [0,1] , default:1},

} , { timestamps : true , toJSON : { virtuals : true } });

brandSchema.plugin(mongoosePaginate);


brandSchema.statics.brandValidation = function(body,req){

    return brandSchemaValidation.validate(body,{abortEarly:false})
 }

 brandSchema.methods.getImage = function (size = '') {
    const brand = this;
    let path = "";
    switch (size) {
      case "480":
        path = brand.logo.path[480];
        break;
      case "720":
        path = brand.logo.path[720];
        break;
      case "1080":
        path = brand.logo.path[1080];
        break;
      default:
        path = brand.logo.path.original;
        break;
    }
    return path;
  };

module.exports = mongoose.model('brands' , brandSchema);