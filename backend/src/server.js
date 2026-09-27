const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const competitionRoutes = require('./routes/competitionRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const seedDatabase = require('./seedFunction');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/competitions', competitionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Feedants API Server Running' });
});

// Start Server & Connect DB
async function startServer() {
  try {
    await connectDB();
    // Seed initial data if DB is empty
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Feedants Backend API listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
