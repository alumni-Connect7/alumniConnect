const SuccessStory = require('../models/SuccessStory');

const ensureOwnershipOrAdmin = (reqUser, story) => {
  if (reqUser.role === 'admin') return true;
  return story.author.toString() === reqUser.id.toString();
};

exports.createStory = async (req, res, next) => {
  try {
    const { title, summary, content, role, company, graduationYear, tags, featured } = req.body;

    if (!title || !content) {
      const err = new Error('title and content are required');
      err.status = 400;
      return next(err);
    }

    const story = await SuccessStory.create({
      title,
      summary,
      content,
      role,
      company,
      graduationYear,
      tags,
      featured,
      author: req.user.id,
    });

    res.status(201).json({ success: true, story });
  } catch (error) {
    next(error);
  }
};

exports.listStories = async (req, res, next) => {
  try {
    const stories = await SuccessStory.find()
      .populate('author', 'name role email graduationYear')
      .sort({ featured: -1, createdAt: -1 });

    res.json({ success: true, count: stories.length, stories });
  } catch (error) {
    next(error);
  }
};

exports.updateStory = async (req, res, next) => {
  try {
    const story = await SuccessStory.findById(req.params.storyId);
    if (!story) {
      const err = new Error('Story not found');
      err.status = 404;
      return next(err);
    }

    if (!ensureOwnershipOrAdmin(req.user, story)) {
      const err = new Error('Not authorized to modify this story');
      err.status = 403;
      return next(err);
    }

    const allowedFields = ['title', 'summary', 'content', 'role', 'company', 'graduationYear', 'tags', 'featured'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        story[field] = req.body[field];
      }
    });

    await story.save();
    res.json({ success: true, story });
  } catch (error) {
    next(error);
  }
};

exports.deleteStory = async (req, res, next) => {
  try {
    const story = await SuccessStory.findById(req.params.storyId);
    if (!story) {
      const err = new Error('Story not found');
      err.status = 404;
      return next(err);
    }

    if (!ensureOwnershipOrAdmin(req.user, story)) {
      const err = new Error('Not authorized to delete this story');
      err.status = 403;
      return next(err);
    }

    await story.deleteOne();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
