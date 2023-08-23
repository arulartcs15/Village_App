const mongoose = require('mongoose')
const {Schema} = mongoose

const villageSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    districtName:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    adminId:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }})

const Village = mongoose.model('Village',villageSchema)

module.exports = Village