const express = require('express')
const multer = require('multer')
const route = express.Router()
const userCtlr = require('../App/controllers/users_Controller')
const villageCtlr = require('../App/controllers/villages_Controller')
const residentCtlr =require('../App/controllers/residents_controller')
const productsCltr =require('../App/controllers/products-Controller')
const eventsCltr =require('../App/controllers/events-Controller')
const userAuthenticate =require('../App/middlewares/authenticate')
const authorize = require('../App/middlewares/authorize')

const upload = multer({dest:'uploads/'})


//users
 route.post('/api/register',userCtlr.register)
 route.post('/api/login',userCtlr.login)

 route.get('/api/account',userAuthenticate,userCtlr.accountDetails)

 route.get('/api/users',userAuthenticate,(req,res,next)=>{
                   req.permittedRoles = ['superAdmin']
                   next()
    },authorize,userCtlr.list)

 route.get('/api/user/:id',userAuthenticate,userCtlr.listOne)
 route.put('/api/user/:id',userAuthenticate,(req,res,next)=>{
   req.permittedRoles = ['superAdmin']
   next()
},authorize,userCtlr.update)

 route.delete('/api/admindelete/:id',userAuthenticate,(req,res,next)=>{
   req.permittedRoles = ['superAdmin']
   next()
},authorize , userCtlr.destroyAdmin)

 route.delete('/api/delete/:id',userAuthenticate,(req,res,next)=>{
   req.permittedRoles = ['superAdmin','admin','resident']
   next()
},authorize,userCtlr.delete)




 //Resident

 route.post('/api/residents',userAuthenticate,(req,res,next)=>{
   req.permittedRoles = ['assistant','admin']
   next()
  },authorize,residentCtlr.create)
 route.get('/api/residents',userAuthenticate,(req,res,next)=>{
    req.permittedRoles = ['assistant','admin']
    next()
   },authorize,residentCtlr.list)
 route.get('/api/residents/:id',userAuthenticate,(req,res,next)=>{
    req.permittedRoles = ['assistant','admin']
    next()
   },authorize,residentCtlr.listOne)
 route.put('/api/residents/:id',userAuthenticate,(req,res,next)=>{
    req.permittedRoles = ['assistant','admin']
    next()
   },authorize,residentCtlr.update)
   route.delete('/api/residents/:id',userAuthenticate,(req,res,next)=>{
      req.permittedRoles = ['admin']
      next()
   },authorize,residentCtlr.delete)
   



//village
   route.post('/api/village',userAuthenticate,(req, res, next) => {
      req.permittedRoles = ['admin']
      next()
  },authorize,villageCtlr.create)
   route.get('/api/village/:id',userAuthenticate,(req, res, next) => {
       req.permittedRoles = ['admin','superAdmin','resident']
       next()
   },authorize,villageCtlr.list)
   
   route.post('/api/village',userAuthenticate,(req, res, next) => {
       req.permittedRoles = ['admin']
       next()
   },authorize,villageCtlr.create)

   route.put('/api/village/:id',userAuthenticate,(req, res, next) => {
      req.permittedRoles = ['admin']
      next()
  },authorize,villageCtlr.update)
   
   route.delete('/api/village/:id',userAuthenticate,(req, res, next) => {
       req.permittedRoles = ['admin']
       next()
   },authorize,villageCtlr.destroy)


//events

route.get('/api/allevents/:id',userAuthenticate, (req, res, next) => {
   req.permittedRoles = ['admin','assistant','resident']
   next()
},authorize,eventsCltr.list)

route.get('/api/events/:id',userAuthenticate, (req, res, next) => {
   req.permittedRoles = ['admin','assistant','resident']
   next()
},authorize,eventsCltr.listOne)

route.post('/api/events',userAuthenticate, (req, res, next) => {
   req.permittedRoles = ['assistant','admin']
   next()
},authorize,eventsCltr.create)

route.put('/api/events/:id',userAuthenticate, (req, res, next) => {
   req.permittedRoles = ['assistant','admin']
   next()
},authorize,eventsCltr.update)

route.delete('/api/events/:id',userAuthenticate, (req, res, next) => {
   req.permittedRoles = ['admin','assistant']
   next()
},authorize,eventsCltr.destroy)



// PRODUCT

route.get('/api/allproducts/:id',userAuthenticate, (req, res, next) => {
   req.permittedRoles = ['admin','resident']
   next()
},authorize,productsCltr.list)

route.get('/api/products/:id',userAuthenticate, (req, res, next) => {
   req.permittedRoles = ['admin','superAdmin','assistant','resident']
   next()
},authorize,productsCltr.listOne)

route.post('/api/products',userAuthenticate, (req, res, next) => {
   req.permittedRoles = ['resident','admin']
   next()
},authorize,upload.single('productImage'),productsCltr.create)

route.put('/api/products/:id',userAuthenticate, (req, res, next) => {
   req.permittedRoles = ['resident','admin']
   next()
},authorize,productsCltr.update)

route.delete('/api/products/:id',userAuthenticate, (req, res, next) => {
   req.permittedRoles = ['assistant','resident','admin']
   next()
},authorize,productsCltr.destroy)




module.exports = route 