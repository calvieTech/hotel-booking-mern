const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');
const { validationResult } = require('express-validator');

// @desc    Login user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  checkValidationResult(req, res);
  const user = await User.findOne({ email });

  if (user) {
    generateToken(res, user._id);
    // console.log(`jwt: `, jwt);

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    console.log(`Couldn't find user`);
    res.status(401);
    throw new Error('Username was not found in our database');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  checkValidationResult(req, res);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists!');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('User could not be created!');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  checkValidationResult(req, res);
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// @desc    GET user profile
// @route   GET /api/users/:id/profile
// @access  Private
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  checkValidationResult(req, res);
  const { id } = req.params;
  const foundUser = await User.findById(id);

  if (!foundUser) {
    const error = new Error('Could not find current user profile based on id');
    res.status(500).json({
      err: error,
      message: error.message,
    });
  }

  res.json({
    firstName: foundUser?.firstName,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profilezz
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  checkValidationResult(req, res);
  const user = await User.findById(req.body._id);

  // console.log(res);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

const checkValidationResult = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Invalid syntax',
    });
  }
  return;
};

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
};
