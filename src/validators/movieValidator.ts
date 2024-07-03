import { body } from 'express-validator';

export const addMovieValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('publishingYear').notEmpty().withMessage('Publishing year is required'),
  body('image').notEmpty().withMessage('Image path is required'),
];

export const editMovieValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('publishingYear').notEmpty().withMessage('Publishing year is required'),
  body('image').notEmpty().withMessage('Image path is required'),
];
