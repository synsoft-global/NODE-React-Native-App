import { body } from 'express-validator';

export const registerValidationRules  = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const loginValidationRules  = [
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').notEmpty().withMessage('Password is required'),
];