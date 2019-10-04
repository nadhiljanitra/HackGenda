const routes = require('express').Router()
const hackgenda = require('./hackgenda')
const DateRouter = require("./DateRouter")

routes.use('/',hackgenda)
routes.use("/dates", DateRouter)

module.exports = routes