const User = require('./models/User');
const Competition = require('./models/Competition');
const Registration = require('./models/Registration');
const Submission = require('./models/Submission');

async function seedDatabase() {
  console.log('Seeding Feedants database...');
  await Competition.deleteMany({});
  await Registration.deleteMany({});
  await Submission.deleteMany({});
  await User.deleteMany({});

  // 1. Create Default Users
  const user1 = await User.create({
    name: 'Aarav Mehta',
    email: 'aarav@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    referralCode: 'aarav123',
  });

  const user2 = await User.create({
    name: 'Riya Shah',
    email: 'riya@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    referralCode: 'riya123',
  });

  const user3 = await User.create({
    name: 'Neha Verma',
    email: 'neha@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    referralCode: 'neha123',
  });

  const user4 = await User.create({
    name: 'Ishika C',
    email: 'ishika@example.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    referralCode: 'ishika123',
  });

  // 2. Create Classical Dance Competition matching Page 3 screenshot exactly!
  const competition = await Competition.create({
    title: 'Feedants Classical Dance',
    category: 'Dance',
    tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
    prizePool: 1500,
    currency: '₹',
    entryFee: 99,
    totalSpots: 20,
    bookedSpots: 1, // "1 / 20 Booked", "Only 19 spots left"
    status: 'REGISTRATION_OPEN',
    judge: {
      name: 'Manju Dubey',
      title: 'Professional Kathak Dancer',
      experience: '12+ Years of Experience',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    importantDates: {
      registerBefore: new Date('2026-08-10T23:50:00'),
      submissionStarts: new Date('2026-08-05T04:00:00'),
      submissionEnds: new Date('2026-08-30T23:55:00'),
      resultDate: new Date('2026-09-01T23:50:00'),
    },
    previousWinners: [
      {
        name: 'Riya Shah',
        rank: '1st Winner',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
      {
        name: 'Aarav Mehta',
        rank: '1st Winner',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      },
      {
        name: 'Neha Verma',
        rank: '2nd Winner',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      },
      {
        name: 'Ishika C',
        rank: '3rd Winner',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      },
    ],
    aboutText:
      'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
    judgingParameters: [
      'Technical Accuracy & Choreography',
      'Rhythm, Beats & Expression (Abhinaya)',
      'Costume, Presentation & Overall Impact',
      'Execution of Mudras and Footwork',
    ],
    rulesAndEligibility: [
      'Open to all age groups & traditional Indian dance styles (Kathak, Bharatanatyam, Odissi, Kuchipudi, etc.).',
      'Video submission duration must be between 1 to 3 minutes.',
      'Must be original unedited continuous recording.',
      'Only contributions from paid participants will be considered for judging.',
    ],
    rewards: [
      { rankTitle: '1st Winner', amount: 550, iconType: 'trophy' },
      { rankTitle: '2nd Winner', amount: 300, iconType: 'trophy' },
      { rankTitle: '3rd Winner', amount: 240, iconType: 'trophy' },
      { rankTitle: '4th Winner', amount: 200, iconType: 'star' },
      { rankTitle: '5th Winner', amount: 130, iconType: 'star' },
      { rankTitle: '6th Winner', amount: 80, iconType: 'star' },
    ],
    disclaimer: 'Disclaimer: Only contributions from paid participants will be considered for judging.',
    referralCode: 'referral123',
    referralBonus: 10,
  });

  // Seed initial 1 booked spot (user2)
  await Registration.create({
    competitionId: competition._id,
    userId: user2._id,
    paymentId: 'PAY_SEED_1001',
    paidAmount: 99,
    registeredAt: new Date(),
  });

  console.log('Database seeded successfully!');
  return { competition, users: [user1, user2, user3, user4] };
}

module.exports = seedDatabase;
