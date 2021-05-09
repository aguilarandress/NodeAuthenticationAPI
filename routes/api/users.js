import express from 'express';
import expressValidator from 'express-validator';
import {
  testUserRoute,
  registerNewUser,
} from '../../controllers/userController.js';

const { body } = expressValidator;

const userRouter = express.Router();

userRouter
  .route('/')
  .post(
    [
      body('email').isEmail().withMessage('Please enter a valid email'),
      body('username')
        .isLength({ min: 5 })
        .withMessage('Please enter a username of at least 5 characters long'),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Please enter a password of at least 5 characters long'),
    ],
    registerNewUser
  );
userRouter.route('/test').get(testUserRoute);

export default userRouter;
