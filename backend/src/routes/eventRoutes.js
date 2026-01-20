const express = require('express');
const { createEvent, listEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const router = express.Router();

router.get('/', auth, listEvents);
router.post('/', auth, allowRoles('admin'), createEvent);
router.patch('/:eventId', auth, allowRoles('admin'), updateEvent);
router.delete('/:eventId', auth, allowRoles('admin'), deleteEvent);

module.exports = router;
