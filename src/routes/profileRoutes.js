const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/profile', profileController.createUserProfile);
router.get('/profile/:user_id', profileController.getUserProfile);

module.exports = router;
