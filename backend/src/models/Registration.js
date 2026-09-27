const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    competitionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['REGISTERED', 'CANCELLED', 'REFUNDED'],
      default: 'REGISTERED'
    },
    paymentId: { type: String, required: true },
    paidAmount: { type: Number, required: true },
    registeredAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Prevent double registration by the same user for the same competition
registrationSchema.index({ competitionId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
