const Profile = require('../models/Profile');
const { User } = require('../models/User');

const buildDirectoryProjection = () => ({
  name: 1,
  email: 1,
  role: 1,
  collegeId: 1,
  graduationYear: 1,
  isApproved: 1,
});

exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(buildDirectoryProjection());
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      profile = await Profile.create({
        user: req.user.id,
        graduationYear: user.graduationYear,
        department: undefined,
      });
    }

    res.json({ success: true, profile, user });
  } catch (error) {
    next(error);
  }
};

exports.updateMyProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'headline',
      'bio',
      'department',
      'graduationYear',
      'currentRole',
      'company',
      'location',
      'phone',
      'socials',
      'skills',
      'certifications',
      'experience',
      'interests',
    ];

    const update = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    });

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: update },
      { new: true, upsert: true }
    );

    res.json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

exports.listDirectory = async (req, res, next) => {
  try {
    const alumniUsers = await User.find({ role: 'alumni', isApproved: true }).select(buildDirectoryProjection());
    const userIds = alumniUsers.map((u) => u._id);

    const profiles = await Profile.find({ user: { $in: userIds } });

    const combined = alumniUsers.map((userDoc) => {
      const profile = profiles.find((p) => p.user.toString() === userDoc._id.toString());
      return { user: userDoc, profile };
    });

    res.json({ success: true, count: combined.length, records: combined });
  } catch (error) {
    next(error);
  }
};

exports.getProfileById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select(buildDirectoryProjection());
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    const profile = await Profile.findOne({ user: user._id });
    res.json({ success: true, user, profile });
  } catch (error) {
    next(error);
  }
};
