const connectDB = require('./config/db');
const seedDatabase = require('./seedFunction');

async function runSeed() {
  await connectDB();
  await seedDatabase();
  console.log('Seeding complete. Exiting...');
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
