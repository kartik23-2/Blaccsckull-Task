const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');

router.get('/:id', competitionController.getCompetitionDetails);
router.post('/:id/register', competitionController.registerForCompetition);
router.post('/:id/submit', competitionController.submitEntry);

module.exports = router;
