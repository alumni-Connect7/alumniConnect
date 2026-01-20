const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 6000 },
    company: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: 'Remote' },
    type: {
      type: String,
      enum: ['job', 'internship'],
      default: 'job',
    },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      default: 'full-time',
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
    applicationUrl: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

jobPostSchema.index({ status: 1, type: 1, createdAt: -1 });
jobPostSchema.index({ createdBy: 1, createdAt: -1 });

module.exports = mongoose.model('JobPost', jobPostSchema);
