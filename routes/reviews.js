const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews')
const ensureLoggedIn = require('../config/ensureLoggedIn')


router.post('/recipes/:id/reviews', ensureLoggedIn, reviewsCtrl.create);

// POST reviews/:id
// router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;