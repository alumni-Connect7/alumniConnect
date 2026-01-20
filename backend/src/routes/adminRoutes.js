const express = require('express');
const { getDashboardStats } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const router = express.Router();

router.get('/stats', auth, allowRoles('admin'), getDashboardStats);

module.exports = router;
