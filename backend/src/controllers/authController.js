const jwt = require('jsonwebtoken');
const { User, ROLES } = require('../models/User');

const signToken = (userId, role) =>
  jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'student', collegeId, graduationYear } = req.body;

    if (!name || !email || !password || !collegeId) {
      const err = new Error('name, email, password, collegeId are required');
      err.status = 400;
      return next(err);
    }

    if (!ROLES.includes(role)) {
      const err = new Error('Invalid role');
      err.status = 400;
      return next(err);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      const err = new Error('Email already registered');
      err.status = 409;
      return next(err);
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      collegeId,
      graduationYear,
    });

    const token = signToken(user._id, user.role);
    res.status(201).json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new Error('email and password are required');
      err.status = 400;
      return next(err);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      return next(err);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      return next(err);
    }

    if (user.role === 'alumni' && !user.isApproved) {
      const err = new Error('Alumni account pending approval');
      err.status = 403;
      return next(err);
    }

    const token = signToken(user._id, user.role);
    res.json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};
