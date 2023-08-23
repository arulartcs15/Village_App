const express = require('express')
const cors = require('cors')
const configureDB = require('./config/database')
const route = require('./config/Route')
const app = express()
const port =3020
app.use(cors())
app.use(express.json())
app.use(route)
app.use('/uploads',express.static('uploads'))

app.listen(port,(req,res)=>{
          console.log(`welcome to port ${port}`)
})
configureDB()