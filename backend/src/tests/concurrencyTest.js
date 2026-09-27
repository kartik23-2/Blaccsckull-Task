const mongoose = require('mongoose');
const connectDB = require('../config/db');
const seedDatabase = require('../seedFunction');
const { registerUserForCompetition } = require('../services/registrationService');
const User = require('../models/User');
const Competition = require('../models/Competition');

async function testConcurrency() {
  console.log('🚀 Starting Concurrency Test: 50 Simultaneous Users for 19 Remaining Spots...');
  await connectDB();
  const { competition } = await seedDatabase();

  console.log(`Initial competition state: Booked ${competition.bookedSpots} / Total ${competition.totalSpots}`);

  // Create 50 dummy user IDs
  const concurrentUsers = [];
  for (let i = 0; i < 50; i++) {
    const user = await User.create({
      name: `Test User ${i + 1}`,
      email: `testuser_${Date.now()}_${i}@example.com`,
    });
    concurrentUsers.push(user._id);
  }

  // Fire 50 simultaneous registration promises
  console.log('⚡ Firing 50 parallel registration requests simultaneously...');
  const results = await Promise.all(
    concurrentUsers.map((userId) =>
      registerUserForCompetition({
        competitionId: competition._id,
        userId,
        paymentId: `PAY_TEST_${userId}`,
        paidAmount: 99,
      })
    )
  );

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  const spotsFullErrors = results.filter((r) => r.code === 'SPOTS_FULL');

  const updatedComp = await Competition.findById(competition._id);

  console.log('\n📊 --- CONCURRENCY TEST RESULTS ---');
  console.log(`Total Requests Sent: 50`);
  console.log(`Successful Registrations: ${successful.length}`);
  console.log(`Failed Registrations: ${failed.length}`);
  console.log(`'SPOTS_FULL' Rejections: ${spotsFullErrors.length}`);
  console.log(`Final Competition Booked Spots: ${updatedComp.bookedSpots} / ${updatedComp.totalSpots}`);

  if (updatedComp.bookedSpots === updatedComp.totalSpots && successful.length === 19) {
    console.log('✅ TEST PASSED: Exactly 19 remaining spots were booked with 0 overbookings!');
  } else {
    console.error('❌ TEST FAILED: Overbooking or spot mismatch detected.');
  }

  process.exit(0);
}

testConcurrency().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
