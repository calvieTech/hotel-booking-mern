const express = require('express');
const {
  logoutUser,
  getUserProfile,
  updateUserProfile,
  loginUser,
  registerUser,
  authUser,
} = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { check } = require('express-validator');
const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
