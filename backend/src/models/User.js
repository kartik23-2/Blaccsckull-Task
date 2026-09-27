const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    referralCode: {
      type: String,
      sparse: true,
      default: () => 'ref_' + Math.random().toString(36).substr(2, 9),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
