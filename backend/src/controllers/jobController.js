const JobPost = require('../models/JobPost');

const ensureOwnershipOrAdmin = (reqUser, resource) => {
  if (reqUser.role === 'admin') return true;
  return resource.createdBy.toString() === reqUser.id.toString();
};

exports.createJob = async (req, res, next) => {
  try {
    const { title, description, company, location, type, employmentType, applicationUrl, tags, expiresAt } =
      req.body;

    if (!title || !description || !company) {
      const err = new Error('title, description, and company are required');
      err.status = 400;
      return next(err);
    }

    const job = await JobPost.create({
      title,
      description,
      company,
      location,
      type,
      employmentType,
      applicationUrl,
      tags,
      expiresAt,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

exports.listJobs = async (req, res, next) => {
  try {
    const { status = 'open', type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const jobs = await JobPost.find(filter)
      .populate('createdBy', 'name email role company')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    next(error);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const job = await JobPost.findById(req.params.jobId).populate('createdBy', 'name email role');
    if (!job) {
      const err = new Error('Job not found');
      err.status = 404;
      return next(err);
    }

    res.json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await JobPost.findById(req.params.jobId);
    if (!job) {
      const err = new Error('Job not found');
      err.status = 404;
      return next(err);
    }

    if (!ensureOwnershipOrAdmin(req.user, job)) {
      const err = new Error('Not authorized to modify this job');
      err.status = 403;
      return next(err);
    }

    const allowedFields = [
      'title',
      'description',
      'company',
      'location',
      'type',
      'employmentType',
      'status',
      'applicationUrl',
      'tags',
      'expiresAt',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await JobPost.findById(req.params.jobId);
    if (!job) {
      const err = new Error('Job not found');
      err.status = 404;
      return next(err);
    }

    if (!ensureOwnershipOrAdmin(req.user, job)) {
      const err = new Error('Not authorized to delete this job');
      err.status = 403;
      return next(err);
    }

    await job.deleteOne();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
