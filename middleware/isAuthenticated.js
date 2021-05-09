import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

/**
 * Checks if user is authenticated correctly
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {function} next Next piece of middleware
 */
const isAuthenticated = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return res.status(401).json({ message: 'Not authorized' });
  } else {
    try {
      // Get token and decode
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await UserModel.findById(decodedToken._id).select('-password');
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
};

export default isAuthenticated;
