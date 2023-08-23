const mongoose=require('mongoose')
const validator = require('validator')

const {Schema}=mongoose

const userSchema=new Schema({
    name:{
         type:String,
         required:true
    },
    phoneNumber:{
        type:String,
        unique:true,
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
   password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'superAdmin'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model('User',userSchema)
module.exports=User
