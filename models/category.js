const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const {categorySchemaValidation} = require('./validation/categoryValidation');


const categorySchema = Schema({
    persian_name : { type : String , required : true},
    original_name : { type : String , required : true},
    slug : { type : String , required : true},
    status : { type: String , enum : [0,1] , default:1},


} , { timestamps : true });

categorySchema.plugin(mongoosePaginate);

categorySchema.statics.categoryValidation = function(body){

    return categorySchemaValidation.validate(body,{abortEarly:false})
 }

module.exports = mongoose.model('Category' , categorySchema);