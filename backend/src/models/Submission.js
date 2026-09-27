const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    competitionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'],
      default: 'SUBMITTED'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
