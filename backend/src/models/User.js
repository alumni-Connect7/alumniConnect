const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLES = ['student', 'alumni', 'admin'];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ROLES,
      default: 'student',
    },
    collegeId: {
      type: String,
      required: true,
      trim: true,
    },
    graduationYear: {
      type: Number,
    },
    isApproved: {
      type: Boolean,
      default: function () {
        return this.role !== 'alumni';
      },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false,
  }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toJSON = function toJSONSafe() {
  const obj = this.toObject({ virtuals: true });
  delete obj.password;
  return obj;
};

module.exports = {
  User: mongoose.model('User', userSchema),
  ROLES,
};
