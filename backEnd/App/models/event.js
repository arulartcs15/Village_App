const mongoose=require('mongoose')
const {Schema}=mongoose

const eventSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    description:{
         type:String,
         required:true
    },
    villageId:{
        type:Schema.Types.ObjectId,
        ref:'Villages',
        required:true
    },
    adminId:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true
       }
})
const Event=mongoose.model('Event',eventSchema)
module.exports=Event