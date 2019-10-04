const jwt = require('jsonwebtoken')


function generateToken(payload){
  return jwt.sign(payload,'hackgendaSALT')
}

function verifyToken(token){
  return jwt.verify(token,'hackgendaSALT') 
}

module.exports = {generateToken,verifyToken}