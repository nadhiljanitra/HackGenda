if(process.env.NODE_ENV=='development'){
    require('dotenv').config();
}

const cors = require('cors');
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const route = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://localhost/HackGenda',{useNewUrlParser:true,useUnifiedTopology:true})

app.use('/',route)

app.listen(PORT,()=>{
  console.log('airing on '+PORT)
})
