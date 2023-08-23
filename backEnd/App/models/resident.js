const mongoose=require('mongoose')
const validator = require('validator')

const {Schema}=mongoose


const residentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
   phoneNumber:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isMobilePhone(value, 'en-IN', { strictMode: false })
            },
            message:function(){
                return 'Invalid a Phone Number'
            }
        }
    },
    doorNo:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        },
        role:{
            type:String,
            default:'resident'
        },
    villageId:{
        type:Schema.Types.ObjectId,
        ref:"Village",
        required:true
    },
    adminId:{
          type:Schema.Types.ObjectId,
          ref:'Users'
         
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const Resident=mongoose.model('Resident',residentSchema)
module.exports=Resident