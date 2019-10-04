const Route = require('express').Router();
const Zomato = require('./zomatoRoute');

Route.get('/',function(req,res){
    res.redirect('/zomato');
})
Route.use('/zomato',Zomato);

module.exports = Route;