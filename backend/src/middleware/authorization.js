import { decodeToken } from "../utils/index.js";
import APIError from "../utils/apiError.js";
import initUserModel from "../models/User/user.js";
import { sequelize } from "../config/database.js";

const User = initUserModel(sequelize);

export const authenticateUser = async (req, res, next) => {
  let refreshToken;
  const cookieToken = req.cookies?.refreshToken;
  console.log('cookieToken:', cookieToken);

  const authHeader = req.headers['authorization'];
  console.log('authHeader:', authHeader);

  if (cookieToken) {
    refreshToken = cookieToken;
    console.log('Using cookie refresh token:', refreshToken);
  } else if (authHeader && authHeader.startsWith("Bearer")) {
    refreshToken = authHeader.split(" ")[1];
    console.log('Using header refresh token:', refreshToken);
  }

  if (!refreshToken || refreshToken === "null") {
    return next(APIError.CustomError("You need to login first", 401));
  }

  try {
   
    req.user = authHeader;
    console.log('Request user:', req.user);

    next();
  } catch (error) {
    console.log('JWT verification error:', error);

    return next(APIError.Unauthenticated("Invalid authentication"));
  }
};

export const authorizedUser = (req, res, next) => {
  if (req.user.role_id === "2" || req.user.role_id === "1") {
    console.log(req.user);
    next();
  } else {
    console.warn("User not Authorized");
    return next(APIError.Forbidden("You lack the authorization for this action"));
  }
};

export const mustBeAdmin = (req, res, next) => {
  if (req.user.role_id === "1") {
    next();
  } else {
    return res.status(401).json({ err: "Unauthorized, Admin Only" });
  }
};

// Convert email to lowercase before processing
export const emailToLowerCase = (req, res, next) => {
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase().trim();
  }
  next();
};
