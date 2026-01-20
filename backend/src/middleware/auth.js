const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      const err = new Error('Authentication required');
      err.status = 401;
      return next(err);
    }

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id);
    if (!user) {
      const err = new Error('User not found');
      err.status = 401;
      return next(err);
    }

    req.user = { id: user._id, role: user.role, isApproved: user.isApproved };
    next();
  } catch (error) {
    const err = new Error('Invalid or expired token');
    err.status = 401;
    next(err);
  }
};

module.exports = auth;
