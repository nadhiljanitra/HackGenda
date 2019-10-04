if(process.env.NODE_ENV=='development'){
    require('dotenv').config();
}

const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const index = require('./routes/index');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());
app.use('/',index)

app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`))