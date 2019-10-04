const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const route = require('./routes')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/HackGenda',{useNewUrlParser:true,useUnifiedTopology:true})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan('dev'))
app.use('/',route)



app.listen(PORT,()=>{
  console.log('airing on '+PORT)
})