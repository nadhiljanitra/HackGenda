const {OAuth2Client } = require('google-auth-library')
const axios = require('axios')
const userModel = require('../models/userModel')
const convert = require('../helpers/converter')
const client = new OAuth2Client('316748583959-pv4hul342392dj2pecbbcvrojfaumeug.apps.googleusercontent.com')
const jwt = require('../helpers/jwt')

class Hackgenda{

  static signin(req,res,next){
    let { id_token } = req.body
    let payloadJWT
    client.verifyIdToken({
      idToken : id_token,
      audience : '316748583959-pv4hul342392dj2pecbbcvrojfaumeug.apps.googleusercontent.com'
    }) 
      .then(ticket=>{
        const payload = ticket.getPayload()
        const { email,name } = payload
        payloadJWT = {email,name} 
        return userModel.findOne({email})
      })
      .then(user=>{
        if (user){
          console.log(user);
          console.log("user ditemukan----------->>>>");
          let token = jwt.generateToken(payloadJWT,'hackgendaSALT')
          res.status(200).json(token)
        } else {
          console.log("user gagal===============>>>>");
          next({status : 500,msg :'gagal'})
        }
      })
      .catch(err=>{
        res.status(500).json(err)
      })
  }

  static getCurrency(req,res,next){
    let negara = req.body.negara
    let currency = convert(negara)
    // let harga = 1000000 // ini diganti sama harga masing-masing
    axios({
      method:"GET",
      url:"https://currency-exchange.p.rapidapi.com/exchange",
      headers:{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"currency-exchange.p.rapidapi.com",
        "x-rapidapi-key":"b7b79cc824mshd189f8cd843325dp183f95jsna2ccbb5d991f"
      },
      params:{
        q:"1.0",
        from:"IDR",
        to: currency
      }
      })
      .then((newCurrency)=>{
        // let convert = newCurrency.data *
        res.status(200).json(newCurrency.data)
      })
      .catch((error)=>{
        res.status(500).json(error)
      })
  }

  static addAgenda(req,res,next){
    let arr = req.body
    console.log(arr)
    // userModel.create() // disini create database yang isinya pilihan restoran dia dan tanggal

  }

  static register(req,res,next){
    let {email,password} = req.body
    userModel.findOne({email})
    .then((username)=>{
      if(username){

        next({status : 500,msg :'gagal'})
      } else {
        return  userModel.create({email,password})
      }
    })
    .then((user)=>{
      res.status(200).json(user)
    })
    .catch((err)=>{
      res.status(500).json(err)
    })
  }

  static update (req, res) {
    let { date, restaurants, token } = req.body;
    let decoded = jwt.verifyToken(token)
    userModel.findOneAndUpdate({email:decoded.email},
      {
        $push:{
          date: date,
          restaurant: restaurants
        }
      })
    .then ( () => {
      console.log("sukses update")
    })
    .catch ( err => {
      console.log(err)
    })
  }

}


module.exports = Hackgenda;