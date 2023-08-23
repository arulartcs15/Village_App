const Product = require('../models/product')

const productsCltr = {}

//list
productsCltr.list = async (req, res) => {
    try {
        const { id } = req.params
        let products
        if (req.user.role === 'resident') {
            products = await Product.find({ villageId: id })
        }
        else if (req.user.role === 'admin') {
            products = await Product.find({ adminId: id })
        }
        res.json(products)

    } catch (e) {
        res.json(e.message)
    }
}


//show 
productsCltr.listOne = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Product.findById(id)
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
productsCltr.create = async (req, res) => {
    try {
        const body = req.body
        const image = req.file.path
        const product = await Product.create({ ...body, image: image })
        res.json(product)

    } catch (e) {
        res.json(e.message)
    }
}

//update 
productsCltr.update = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const data = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        console.log(data,'d')
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}


//destroy
productsCltr.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Product.findByIdAndDelete(id)
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}

module.exports = productsCltr