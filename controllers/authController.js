import expressValidator from 'express-validator';
import generateToken from '../utils/generateToken.js';

import UserModel from '../models/User.js';

const { validationResult } = expressValidator;

// @route   GET - /api/users/test
// @desc    Test user route
// @access  Public
export const testAuthenticationRoute = async (req, res) => {
  return res.json({ message: 'Authentication API test...' });
};

// @route   POST - /api/auth/
// @desc    Authenticates a user and generates a token
// @access  Public
export const authenticateUser = async (req, res) => {
  try {
    // Check for errors in request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // Check if email exists
    const userWithEmail = await UserModel.findOne({ email });
    if (!userWithEmail) {
      return res.status(404).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    // Check if password matches
    const passwordsMatch = await userWithEmail.checkPassword(password);
    if (!passwordsMatch) {
      return res.status(404).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    return res.json({
      token: generateToken({
        _id: userWithEmail._id,
        username: userWithEmail.username,
        email: userWithEmail.email,
      }),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// @route   GET - /api/auth/current
// @desc    Gets current user info
// @access  Private
export const getCurrentUser = async (req, res) => {
  return res.json(req.user);
};
