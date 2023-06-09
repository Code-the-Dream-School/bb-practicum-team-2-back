const { UnauthenticatedError } = require('../errors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  console.log(authHeader);
  if(!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
const token = authHeader.split(' ')[1]


try {
  const payload = jwt.verify(token, process.env.JWT_SECRET)
  // attach the user to the audit routes
  console.log(payload)
  

  req.user = {userId:payload.userId, username:payload.username}
  next()
} catch (error) {
  throw new UnauthenticatedError('Authentication invalid')
}
}


module.exports = auth;


