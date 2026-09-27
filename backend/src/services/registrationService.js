const Competition = require('../models/Competition');
const Registration = require('../models/Registration');

/**
 * Atomic spot registration for high-concurrency environments.
 * Prevents race conditions and overbooking when multiple users register simultaneously.
 */
async function registerUserForCompetition({ competitionId, userId, paymentId, paidAmount }) {
  // 1. Check if user already registered
  const existingReg = await Registration.findOne({ competitionId, userId });
  if (existingReg) {
    return {
      success: false,
      code: 'ALREADY_REGISTERED',
      message: 'User is already registered for this competition.',
      registration: existingReg,
    };
  }

  // 2. Perform atomic findOneAndUpdate on Competition ensuring bookedSpots < totalSpots
  const updatedComp = await Competition.findOneAndUpdate(
    {
      _id: competitionId,
      $expr: { $lt: ['$bookedSpots', '$totalSpots'] },
      status: { $in: ['REGISTRATION_OPEN', 'SUBMISSION_OPEN'] }
    },
    { $inc: { bookedSpots: 1 } },
    { new: true }
  );

  if (!updatedComp) {
    // Check why it failed
    const compCheck = await Competition.findById(competitionId);
    if (!compCheck) {
      return { success: false, code: 'NOT_FOUND', message: 'Competition not found.' };
    }
    if (compCheck.bookedSpots >= compCheck.totalSpots) {
      return { success: false, code: 'SPOTS_FULL', message: 'Registration full! All spots have been booked.' };
    }
    return { success: false, code: 'REGISTRATION_CLOSED', message: `Registration is currently ${compCheck.status}.` };
  }

  // 3. Create Registration document
  try {
    const registration = await Registration.create({
      competitionId,
      userId,
      paymentId: paymentId || `PAY_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      paidAmount: paidAmount || updatedComp.entryFee,
      registeredAt: new Date(),
    });

    return {
      success: true,
      code: 'SUCCESS',
      message: 'Successfully registered for competition!',
      registration,
      competition: updatedComp,
    };
  } catch (err) {
    // Rollback atomic counter in case of registration creation error (e.g., unique key constraint)
    await Competition.findByIdAndUpdate(competitionId, { $inc: { bookedSpots: -1 } });

    if (err.code === 11000) {
      return { success: false, code: 'ALREADY_REGISTERED', message: 'User is already registered for this competition.' };
    }
    throw err;
  }
}

module.exports = {
  registerUserForCompetition,
};
