import express from 'express';
import expressValidator from 'express-validator';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import {
  testAuthenticationRoute,
  authenticateUser,
  getCurrentUser,
} from '../../controllers/authController.js';

const { body } = expressValidator;

const authRouter = express.Router();

authRouter
  .route('/')
  .post(
    [
      body('email').exists().withMessage('Please enter your email'),
      body('password').exists().withMessage('Please enter your password'),
    ],
    authenticateUser
  );
authRouter.route('/current').get(isAuthenticated, getCurrentUser);
authRouter.route('/test').get(testAuthenticationRoute);

export default authRouter;
