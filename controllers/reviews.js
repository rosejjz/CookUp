const Recipe = require('../models/recipe');

module.exports = {
  create
};

function create(req, res) {

  Recipe.findById(req.params.id, function(err, recipe) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    recipe.reviews.push(req.body);
    recipe.save(function(err) {
      console.log(recipe._id)
      res.redirect(`/recipes/${recipe._id}`);
    });
  });
}