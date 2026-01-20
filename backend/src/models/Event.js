const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 4000 },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    audience: {
      type: String,
      enum: ['all', 'student', 'alumni'],
      default: 'all',
    },
    isPublished: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

eventSchema.index({ startDate: 1 });
eventSchema.index({ audience: 1, isPublished: 1 });

module.exports = mongoose.model('Event', eventSchema);
