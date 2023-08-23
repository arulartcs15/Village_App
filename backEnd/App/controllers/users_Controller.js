const User = require('../models/user')
const Resident = require('../models/resident')
const Village = require('../models/village')
const Event = require('../models/event')
const Product =require('../models/product')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userCtlr = {}

userCtlr.register = async (req, res) => {
    try {
        const { body } = req
        const newUser = await User.create(body)
        const saltValue = await bcryptjs.genSalt()
        const hashValue = await bcryptjs.hash(newUser.password, saltValue)
        newUser.password = hashValue
        const userData = await newUser.save()
        res.json(userData)
    }
    catch (e) {
        res.json(e.message)
    }
}

userCtlr.login = async (req, res) => {
    try {
        const { body } = req
         let userData
        userData = await User.findOne({ phoneNumber: body.phoneNumber }) || (userData = await Resident.findOne({ phoneNumber: body.phoneNumber }) )
        if (!userData) {
            res.json({
                errors: "Invalid phoneNumber or password"
            })
        }
        else {
            const verifyPassword = await bcryptjs.compare(body.password, userData.password)
            if (verifyPassword) {
                const tokenData = {
                    id: userData._id,
                    role: userData.role
                }
                const jwttoken = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
                res.json({
                    token: `Bearer ${jwttoken}`
                })
            }
            else {
                res.json({
                    errors: "Invalid phoneNumber or password"
                })
            }

        }

    }
    catch (e) {

    }
}



//Getting users based on role "admin"


userCtlr.list = async (req, res) => {
    try {

        const adminData = await User.find({ role: 'admin' })
        const adminData1 = await User.find({ role: '' }) 
        const adminData2 = adminData.concat(adminData1)
        res.json(adminData2)
    }
    catch (e) {
        res.json(e)
    }
}


userCtlr.listOne = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findById(id)
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}
userCtlr.accountDetails = async (req, res) => {
    try {
        const id = req.user.id
        let data
         data = await User.findById(id) ||  (data = await Resident.findById(id))
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}
userCtlr.update = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const data = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}


userCtlr.delete = async (req, res) => {
    try {
        const id  = req.params.id
         if(req.user.role === 'admin' || req.user.role === 'superAdmin' ){
            const user = await User.findByIdAndDelete(id)
            const village = await Village.findOneAndDelete({ adminId: id })
            const resident = await Resident.deleteMany({ adminId: id })
             const event = await Event.deleteMany({ adminId: id })
             const product = await Product.deleteMany({adminId:id})
            const result = await Promise.all([user, village, resident,product])
            res.json(result[0])
          }
          else if(req.user.role === 'resident'){
            const resident = await Resident.findOneAndDelete(id)
            const product = await Product.deleteMany({ residentId:id })
            const result = await Promise.all([resident,product])
            res.json(result[0])
      }
        
    }
    catch (e) {
        res.json(e)
    }
}

//deleting a admin

userCtlr.destroyAdmin = async(req,res)=>{

    try{
       const id  = req.params.id
       const type = req.query.type
        let updatedData
        let residentData
        if(type == 'soft'){
            updatedData = await User.findByIdAndUpdate(id,{isDeleted:true,role:''},{new:true,runValidators:true})
            residentData = await Resident.updateMany({adminId:id},{ $set: { role: '' } })
            console.log(residentData)
           } 
       else if(type == 'restore') {
           updatedData = await User.findByIdAndUpdate(id,{isDeleted:false,role:'admin'},{new:true,runValidators:true})
           residentData = await Resident.updateMany({adminId:id},{ $set: { role: 'resident' } })
          
          }
           res.json(updatedData)
            
    }
    catch(e){
         res.json(e)
    }
}

module.exports = userCtlr



