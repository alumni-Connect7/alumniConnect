const { User } = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

exports.approveAlumni = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    if (user.role !== 'alumni') {
      const err = new Error('User is not an alumni');
      err.status = 400;
      return next(err);
    }

    user.isApproved = true;
    await user.save();

    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

exports.getApprovedAlumni = async (req, res, next) => {
  try {
    const alumni = await User.find({ role: 'alumni', isApproved: true }).select('-password');
    res.json({ success: true, count: alumni.length, alumni });
  } catch (error) {
    next(error);
  }
};
