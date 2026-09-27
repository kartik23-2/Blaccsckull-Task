const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.patch('/competitions/:id', adminController.updateCompetitionStatus);
router.post('/reset', adminController.resetDatabase);

module.exports = router;
