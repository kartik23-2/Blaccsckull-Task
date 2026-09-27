const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const Submission = require('../models/Submission');
const { registerUserForCompetition } = require('../services/registrationService');

// Get single competition details with dynamic status and user participation state
exports.getCompetitionDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers['x-user-id'] || req.query.userId;

    let competition;
    if (id === 'default' || id === 'latest') {
      competition = await Competition.findOne().sort({ createdAt: -1 });
    } else {
      competition = await Competition.findById(id);
    }

    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found' });
    }

    // Check user registration state if userId provided
    let userState = {
      isRegistered: false,
      hasSubmitted: false,
      registration: null,
      submission: null,
    };

    if (userId) {
      const registration = await Registration.findOne({
        competitionId: competition._id,
        userId: userId,
      });

      if (registration) {
        userState.isRegistered = true;
        userState.registration = registration;

        const submission = await Submission.findOne({
          competitionId: competition._id,
          userId: userId,
        });

        if (submission) {
          userState.hasSubmitted = true;
          userState.submission = submission;
        }
      }
    }

    res.status(200).json({
      success: true,
      competition,
      userState,
      serverTime: new Date(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Register for competition
exports.registerForCompetition = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || req.headers['x-user-id'];
    const { paymentId, paidAmount } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required for registration' });
    }

    let competition = await Competition.findById(id);
    if (!competition) {
      competition = await Competition.findOne();
    }

    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found' });
    }

    const result = await registerUserForCompetition({
      competitionId: competition._id,
      userId,
      paymentId,
      paidAmount,
    });

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Submit entry for competition
exports.submitEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || req.headers['x-user-id'];
    const { title, description, videoUrl } = req.body;

    if (!userId || !title || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: 'userId, title, and videoUrl are required',
      });
    }

    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found' });
    }

    // Verify user registration
    const registration = await Registration.findOne({
      competitionId: competition._id,
      userId,
      status: 'REGISTERED',
    });

    if (!registration) {
      return res.status(403).json({
        success: false,
        message: 'You must be registered for this competition to submit an entry.',
      });
    }

    // Upsert or create submission
    let submission = await Submission.findOne({
      competitionId: competition._id,
      userId,
    });

    if (submission) {
      submission.title = title;
      submission.description = description || submission.description;
      submission.videoUrl = videoUrl;
      submission.submittedAt = new Date();
      await submission.save();
    } else {
      submission = await Submission.create({
        competitionId: competition._id,
        userId,
        title,
        description,
        videoUrl,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Submission uploaded successfully!',
      submission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
