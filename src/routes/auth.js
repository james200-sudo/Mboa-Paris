const express = require('express');
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateProfile
} = require('../controllers/authController');

const validate = require('../middlewares/validate');
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  updateProfileValidator
} = require('../middlewares/authValidation');
const { googleLogin } = require('../controllers/googleLogin');

const auth = require('../middlewares/auth');

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/forgot-password', forgotPasswordValidator, validate, forgotPassword);
router.post('/reset-password', resetPasswordValidator, validate, resetPassword);
router.put('/update-profile', auth, updateProfileValidator, validate, updateProfile);


router.post('/google', googleLogin);

module.exports = router;
