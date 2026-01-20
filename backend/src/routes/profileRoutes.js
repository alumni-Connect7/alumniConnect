const express = require('express');
const {
  getMyProfile,
  updateMyProfile,
  listDirectory,
  getProfileById,
} = require('../controllers/profileController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const router = express.Router();

router.get('/me', auth, getMyProfile);
router.put('/me', auth, updateMyProfile);
router.get('/directory', auth, allowRoles('student', 'alumni', 'admin'), listDirectory);
router.get('/:userId', auth, allowRoles('admin'), getProfileById);

module.exports = router;
