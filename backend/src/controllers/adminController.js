const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const Submission = require('../models/Submission');
const seedDatabase = require('../seedFunction');

// Reset or update competition state dynamically
exports.updateCompetitionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, bookedSpots, totalSpots } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (bookedSpots !== undefined) updateFields.bookedSpots = Number(bookedSpots);
    if (totalSpots !== undefined) updateFields.totalSpots = Number(totalSpots);

    const competition = await Competition.findByIdAndUpdate(id, updateFields, { new: true });
    res.status(200).json({ success: true, message: 'Competition updated', competition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reset database / seed database
exports.resetDatabase = async (req, res) => {
  try {
    await seedDatabase();
    const competition = await Competition.findOne().sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: 'Database reset & re-seeded successfully!', competition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
