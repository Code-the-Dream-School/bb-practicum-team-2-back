const express = require('express')
const router = express.Router()

const {
  getUser,
  updateUser,
  updateUsername,
  updatePassword,
} = require('../controllers/user');

router.route('/updatePassword').patch(updatePassword);
router.route('/:id').get(getUser).patch(updateUser);
router.route('/updateUsername').patch(updateUsername);




module.exports = router