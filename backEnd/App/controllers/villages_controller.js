const Village = require('../models/village')
const villageCtlr = {}

// GET

villageCtlr.list = async (req, res) => {
    const {id} = req.params
    try {
        const villages = await Village.findOne({adminId:id})
        res.json(villages)
    }
    catch (e) {
        res.json(e)
    }
}

// CREATE

villageCtlr.create = async (req, res) => {
    try {
        const { body } = req
        const newVillage = await Village.create({ ...body, adminId: req.user.id })
        res.json(newVillage)
    }
    catch (e) {
        res.json(e)
    }
}

//update
villageCtlr.update = async (req, res) => {
    try {
        const { id } = req.params
        const {body} = req
        const newVillage = await Village.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        res.json(newVillage)
    }
    catch (e) {
        res.json(e)
    }
}

// DELETE

villageCtlr.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Village.findByIdAndDelete(id)
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}


module.exports = villageCtlr