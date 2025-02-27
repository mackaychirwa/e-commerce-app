import jwt from 'jsonwebtoken';
import initUserModel from '../models/User/user.js';
import { sequelize } from '../config/database.js';

const User = initUserModel(sequelize);

// Create a JWT token
const createToken = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Generating a refresh token
const generateAccessRefreshToken = async (tokenUser) => {
  const user = await User.findOne({ where: { id: tokenUser.userId } });

  if (!user) {
    throw new Error("User not found");
  }

  // Generate a refresh token
  const refreshToken = user.generateRefreshToken({ payload: tokenUser });

  // Save the refresh token to the user in the database
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Return the generated refresh token
  return { refreshToken };
};

// Decode a refresh token
const decodeToken = (refreshToken) => {
  console.log('Decoding', refreshToken);
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};

// Verify the access token
const verifyToken = (token) => {
  console.log('verifying', token);

  return jwt.verify(token.token, process.env.JWT_SECRET_KEY);
};

// Add the refresh token to a cookie
const addTokenToCookie = ({ res, user }) => {

  const refreshToken = createToken({ payload: user });

  let now = new Date();
  const cookieExpiration = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  res.cookie('token', refreshToken,
    {
    httpOnly: false, 
    expires: cookieExpiration, 
    secure: false, 
    sameSite: 'Lax',
  }
);
console.log("Cookie Set Successfully");
};

export default { decodeToken, verifyToken, createToken, addTokenToCookie, generateAccessRefreshToken };
