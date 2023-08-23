const bcryptjs = require('bcryptjs')
const Resident = require('../models/resident')
const residentCtlr = {}

residentCtlr.create = async(req,res)=>{
    try{
         const {body} = req
         const newResident = await Resident.create({...body,adminId:req.user.id})
         const saltValue = await bcryptjs.genSalt()
         const hashValue = await bcryptjs.hash(newResident.password, saltValue)
         newResident.password = hashValue
         const userData = await newResident.save()
         res.json(userData)
      
    }
    catch(e){
        res.json(e)
    }
}
residentCtlr.list = async(req,res)=>{
    try{
         const residentData = await Resident.find({adminId:req.user.id})
         if(residentData){
         res.json(residentData)
         }
         else{
            res.json({
                errors:"No Residents Data Found"
            })
         }
    }
    catch(e){
        res.json(e)
    }
}
residentCtlr.listOne = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Resident.findById(id)
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}
residentCtlr.update = async (req, res) => {
    try {
        const id = req.params.id
        const body=req.body
        const data = await Resident.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    }catch(e){
        res.json(e.message)
    }
}


residentCtlr.delete = async(req,res)=>{
    try{
        const {id} = req.params
         const type = req.query.type
         let updatedData
         if(type == 'soft'){
              updatedData = await Resident.findByIdAndUpdate(id,{isDeleted:true},{new:true,runValidators:true})
             } 
         else {
            updatedData = await Resident.findByIdAndDelete(id)
            }
         res.json(updatedData)
    }
    catch(e){
        res.json(e)
    }
} 
module.exports = residentCtlr