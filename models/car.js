const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const {carSchemaValidation} = require('./validation/carValidation');


const carSchema = Schema({
    name : { type : String , required : true},
    category : { type : Schema.Types.ObjectId , ref : 'Category' , required : true},
    brand : { type : Schema.Types.ObjectId , ref : 'Brand' ,  required : true},
    image : { type : Schema.Types.Mixed},
    color : { type : String , required : true},
    power : { type : String , required : true},
    price_us : { type : String , required : true},
    country : { type : String , required : true},
    maxspeed : { type : String , required : true},
    safety_class : { type : String , required : true},
    fuel_consumption : { type : String , required : true},
    acceleration : { type : String , required : true},
    status : { type: String , enum : [0,1] , default:1},


} , { collection: 'cars',timestamps : true });

carSchema.plugin(mongoosePaginate);

// carSchema.virtual('categoryy' , {
//   ref : 'Category',
//   localField : '_id',
//   foreignField : 'category'
// })

// carSchema.virtual('brand' , {
//   ref : 'Brand',
//   localField : '_id',
//   foreignField : 'car'
// })

carSchema.statics.carValidation = function(body,req){

    return carSchemaValidation.validate(body,{abortEarly:false})
 }



 carSchema.methods.getImage = function (size = '') {
    const car = this;
    let path = "";
    switch (size) {
      case "480":
        path = car.image.path[480];
        break;
      case "720":
        path = car.image.path[720];
        break;
      case "1080":
        path = car.image.path[1080];
        break;
      default:
        path = car.image.path.original;
        break;
    }
    return path;
  };

module.exports = mongoose.model('Car' , carSchema);