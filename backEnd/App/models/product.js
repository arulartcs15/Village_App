const mongoose=require('mongoose')
const validator = require('validator')

const {Schema}=mongoose


const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return validator.isMobilePhone(value, 'en-IN', { strictMode: false })
            },
            message:function(){
                return 'Invalid a Phone Number'
            }
        }
    },
    quantity:{
        type:String,
        required:true
    },
    description:{
         type:String,
         required:true
    },
    image:{
        type:String,
        required:true
    },
    residentId:{
          type:Schema.Types.ObjectId,
          ref:'Resident',
          required:true
          },
    villageId:{
        type:Schema.Types.ObjectId,
        ref:'Village',
        required:true
     },
     adminId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
     }

})

const Product=mongoose.model('Product',productSchema)
module.exports=Product