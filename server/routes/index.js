const routes = require('express').Router()
const hackgenda = require('./hackgenda')
const DateRouter = require("./DateRouter")
const Zomato = require('./zomatoRoute');

routes.use('/',hackgenda)
routes.use("/dates", DateRouter)
routes.use('/zomato',Zomato);

module.exports = routes
