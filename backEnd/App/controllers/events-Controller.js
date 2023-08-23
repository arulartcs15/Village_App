const Event=require('../models/event')


const eventsCltr={}


//list
eventsCltr.list = async (req, res) => {
    try {
        const {id} =  req.params
        const events = await Event.find({adminId:id})
       res.json(events)

    } catch (e) {
        res.json(e.message)
    }
}


//show 
eventsCltr.listOne = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Event.findById(id)
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}


//create
eventsCltr.create = async (req, res) => {
    try {
        const body = req.body
        const event = await Event.create(body)
        res.json(event)

    } catch (e) {
        res.json(e.message)
    }
}


//update 
eventsCltr.update = async (req, res) => {
    try {
        const id = req.params.id
        const body=req.body
        const data = await Event.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    }catch(e){
        res.json(e.message)
    }
}


//destroy
eventsCltr.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Event.findByIdAndDelete(id)
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    }catch(e){
        res.json(e.message)
    }
}

module.exports=eventsCltr