const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  { _id: false }
);

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    issuer: { type: String, trim: true },
    year: { type: String, trim: true },
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    company: { type: String, trim: true },
    type: {
      type: String,
      enum: ['internship', 'freelancing', 'full-time', 'part-time', 'contract'],
      default: 'full-time',
    },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    description: { type: String, trim: true, maxlength: 2000 },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    headline: { type: String, trim: true, maxlength: 160 },
    bio: { type: String, trim: true, maxlength: 2000 },
    department: { type: String, trim: true },
    graduationYear: { type: Number },
    currentRole: { type: String, trim: true },
    company: { type: String, trim: true },
    location: { type: String, trim: true },
    phone: { type: String, trim: true },
    socials: {
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      twitter: { type: String, trim: true },
    },
    skills: [skillSchema],
    certifications: [certificationSchema],
    experience: [experienceSchema],
    interests: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

profileSchema.index({ department: 1, graduationYear: -1 });
profileSchema.index({ 'skills.name': 1 });

module.exports = mongoose.model('Profile', profileSchema);
