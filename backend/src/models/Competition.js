const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  rankTitle: { type: String, required: true }, // e.g., "1st Winner", "2nd Winner"
  amount: { type: Number, required: true },
  iconType: { type: String, default: 'trophy' } // 'trophy', 'medal', 'star'
});

const winnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: String, required: true }, // e.g., "1st Winner"
  avatar: { type: String, required: true }
});

const competitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: 'Feedants Classical Dance' },
    category: { type: String, default: 'Dance' },
    tags: [{ type: String }], // ['Dance', 'Multi-Win', 'Winners get certificate']
    prizePool: { type: Number, required: true, default: 1500 },
    currency: { type: String, default: '₹' },
    entryFee: { type: Number, required: true, default: 99 },
    totalSpots: { type: Number, required: true, default: 20 },
    bookedSpots: { type: Number, required: true, default: 1 },
    status: {
      type: String,
      enum: ['UPCOMING', 'REGISTRATION_OPEN', 'SUBMISSION_OPEN', 'UNDER_REVIEW', 'COMPLETED'],
      default: 'REGISTRATION_OPEN'
    },
    judge: {
      name: { type: String, default: 'Manju Dubey' },
      title: { type: String, default: 'Professional Kathak Dancer' },
      experience: { type: String, default: '12+ Years of Experience' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
      videoUrl: { type: String, default: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    },
    importantDates: {
      registerBefore: { type: Date, required: true },
      submissionStarts: { type: Date, required: true },
      submissionEnds: { type: Date, required: true },
      resultDate: { type: Date, required: true }
    },
    previousWinners: [winnerSchema],
    aboutText: {
      type: String,
      default: 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.'
    },
    judgingParameters: [
      { type: String }
    ],
    rulesAndEligibility: [
      { type: String }
    ],
    rewards: [rewardSchema],
    disclaimer: {
      type: String,
      default: 'Disclaimer: Only contributions from paid participants will be considered for judging.'
    },
    referralCode: { type: String, default: 'referral123' },
    referralBonus: { type: Number, default: 10 }
  },
  { timestamps: true }
);

// Virtual for remaining spots
competitionSchema.virtual('remainingSpots').get(function () {
  return Math.max(0, this.totalSpots - this.bookedSpots);
});

competitionSchema.set('toJSON', { virtuals: true });
competitionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Competition', competitionSchema);
