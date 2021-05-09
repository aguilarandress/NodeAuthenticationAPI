import expressValidator from 'express-validator';
import UserModel from '../models/User.js';

const { validationResult } = expressValidator;

// @route   GET - /api/users/test
// @desc    Test user route
// @access  Public
export const testUserRoute = async (req, res) => {
  return res.json({ message: 'User API test...' });
};

// @route   POST - /api/users
// @desc    Registers a new user
// @access  Public
export const registerNewUser = async (req, res) => {
  try {
    // Check for errors in request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, username, password } = req.body;
    // Check for user with email
    if (await UserModel.findOne({ email })) {
      return res
        .status(400)
        .json({ errors: [{ param: 'email', msg: 'Email already exists' }] });
    }
    // Create new user
    const newUser = new UserModel({
      email,
      username,
      password,
    });
    newUser.save();
    return res.json({
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      created_at: newUser.created_at,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error...' });
  }
};
