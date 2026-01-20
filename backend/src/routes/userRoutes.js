const express = require('express');
const { getAllUsers, approveAlumni, getApprovedAlumni } = require('../controllers/userController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const router = express.Router();

router.get('/', auth, allowRoles('admin'), getAllUsers);
router.patch('/:userId/approve', auth, allowRoles('admin'), approveAlumni);
router.get('/alumni/approved', auth, allowRoles('student'), getApprovedAlumni);

module.exports = router;
