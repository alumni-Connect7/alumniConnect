const express = require('express');
const { createPost, listPosts } = require('../controllers/mentorshipController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const router = express.Router();

router.post('/', auth, allowRoles('alumni'), createPost);
router.get('/', auth, listPosts); // any authenticated user can view

module.exports = router;
