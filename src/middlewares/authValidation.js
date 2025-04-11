const { body } = require('express-validator');

exports.registerValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.forgotPasswordValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
];

exports.resetPasswordValidator = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
];

exports.updateProfileValidator = [
  body('name').optional().isLength({ min: 2 }),
  body('email').optional().isEmail(),
  body('bio').optional().isString(),
  body('photo').optional().isString(),
];
