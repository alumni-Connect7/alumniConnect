const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    summary: { type: String, trim: true, maxlength: 600 },
    content: { type: String, required: true, trim: true, maxlength: 6000 },
    role: { type: String, trim: true },
    company: { type: String, trim: true },
    graduationYear: { type: Number },
    tags: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

successStorySchema.index({ featured: -1, createdAt: -1 });
successStorySchema.index({ company: 1 });

module.exports = mongoose.model('SuccessStory', successStorySchema);
