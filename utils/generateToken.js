import jwt from 'jsonwebtoken';

/**
 * Generates a json web token from a payload
 * @param {object} data Data for token payload
 */
const generateToken = (data) => {
  return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });
};

export default generateToken;
