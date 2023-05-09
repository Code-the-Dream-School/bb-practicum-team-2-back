const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError,UnauthenticatedError} = require('../errors')

const getUser = async (req,res) =>{
  const { params:{id:_id}} = req
  const user = await User.findOne({username:_id})
  if(!user) throw new NotFoundError (`No user with id ${_id}`)
  res.status(StatusCodes.OK).json({user})
}

const updateUser = async (req,res) => {
    const {params:{id:_id}} = req
    console.log(req.body,'body of update');
    const user = await User.findOneAndUpdate({_id:_id}, req.body,{new:true, runValidators:true})
    if(!user) throw new NotFoundError (`No user with id ${_id}`)
    res.status(StatusCodes.OK).json({user})
}

// const updatePassword = async (req, res) => {
//   const {params:{id:_id}} = req
//   console.log(req.body.oldPassword, req.body.newPassword)
//   if (!req.body.oldPassword || !req.body.newPassword) {
//     throw new BadRequestError('Please provide both values');
//   }
//   else {
//     const isPasswordCorrect = await user.comparePassword(oldPassword);
//     if (!isPasswordCorrect) {
//       throw new UnauthenticatedError('Invalid Credentials');
//     } else {
//     const user = await User.findOneAndUpdate({_id:_id})
//     console.log(user)
     
//     user.password = req.body.newPassword;
  
//     await user.save();
//     res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
//     }
//   }
// };

const updateUsername = async (req, res) => {
  const { email, username } = req.body;
  if (!email || !username) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.username = username;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide both values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};


module.exports = {
  getUser,
  updateUser,
  updateUsername,
  updatePassword
}