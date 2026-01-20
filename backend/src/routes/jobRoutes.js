const express = require('express');
const { createJob, listJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const router = express.Router();

router.get('/', auth, listJobs);
router.get('/:jobId', auth, getJobById);
router.post('/', auth, allowRoles('alumni', 'admin'), createJob);
router.patch('/:jobId', auth, allowRoles('alumni', 'admin'), updateJob);
router.delete('/:jobId', auth, allowRoles('alumni', 'admin'), deleteJob);

module.exports = router;
