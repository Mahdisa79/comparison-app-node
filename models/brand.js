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

brandSchema.statics.brandValidation = function(body){

    return brandSchemaValidation.validate(body,{abortEarly:false})
 }

module.exports = mongoose.model('brands' , brandSchema);