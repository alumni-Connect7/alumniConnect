const express = require('express');
const {
  createStory,
  listStories,
  updateStory,
  deleteStory,
} = require('../controllers/successStoryController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const router = express.Router();

router.get('/', auth, listStories);
router.post('/', auth, allowRoles('alumni', 'admin'), createStory);
router.patch('/:storyId', auth, allowRoles('alumni', 'admin'), updateStory);
router.delete('/:storyId', auth, allowRoles('alumni', 'admin'), deleteStory);

module.exports = router;
