const hackgenda = require('express').Router()
const agendaCont = require('../controllers/hackgenda')


hackgenda.post('/signin',agendaCont.signin)
hackgenda.post('/currency',agendaCont.getCurrency)
hackgenda.post('/inputArr',agendaCont.addAgenda)
hackgenda.post('/register',agendaCont.register)


module.exports = hackgenda;