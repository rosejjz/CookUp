var express = require('express');
var router = express.Router();
const passport = require('passport');
const recipesCtrl = require('../controllers/recipes')

//GET recipe search index page
router.get('/', recipesCtrl.index);

//GET /recipes/:id
router.get('/:id', recipesCtrl.show);

module.exports = router;