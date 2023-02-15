var express = require('express');
var router = express.Router();
const passport = require('passport');
const token = process.env.API_KEY
const ROOT_URL = "https://api.spoonacular.com"

/* GET home page. */
router.get('/', async function (req, res, next) {
  const recipeData = await fetch(`${ROOT_URL}/recipes/random?apiKey=${token}&number=6`)
    .then(res => res.json());
  return res.render('recipes/homepage', {title: "CookUp", recipeData});
});

router.get('/auth/google', passport.authenticate(
  // passport strategy
  'google',
  {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/');
  });
})

module.exports = router;
