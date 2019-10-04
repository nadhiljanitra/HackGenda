const routes = require('express').Router()
const hackgenda = require('./hackgenda')

routes.use('/',hackgenda)

module.exports = routes