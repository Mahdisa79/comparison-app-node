const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');


const compareSchema = Schema({

  user : { type : Schema.Types.ObjectId , ref : 'User' , required : true},
  car : { type : Schema.Types.ObjectId , ref : 'Car' , required : true },

} , {  collection: 'compares' , timestamps : true , toJSON : { virtuals : true }  });

compareSchema.plugin(mongoosePaginate);



module.exports = mongoose.model('Compare' , compareSchema);