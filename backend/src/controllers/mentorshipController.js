const MentorshipPost = require('../models/MentorshipPost');

exports.createPost = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      const err = new Error('title and description are required');
      err.status = 400;
      return next(err);
    }

    const post = await MentorshipPost.create({
      title,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

exports.listPosts = async (req, res, next) => {
  try {
    const posts = await MentorshipPost.find()
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: posts.length, posts });
  } catch (error) {
    next(error);
  }
};
