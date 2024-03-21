const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// check if there is a token from the cookie
// if so, verify token and get userId from payload
// next, find the user by id and attach the user to the req object
// finally, call next() to move on to the next middleware fcs
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // console.log(`req: `, req);
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      xxxx;
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    // console.log(`res: `, res);
    res.status(401);
    throw new Error('Not authorized, no token!');
  }
});

module.exports = { protect };
