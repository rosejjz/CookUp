const token = process.env.API_KEY
const ROOT_URL = "https://api.spoonacular.com"
const Recipe = require('../models/recipe')

module.exports = {
    index,
    show
}

async function show(req, res, next) {
    const id = req.params.id
    const data = await fetch(`${ROOT_URL}/recipes/${id}/information?apiKey=${token}&includeNutrition=false`)
        .then(res => res.json());
    const steps = []
    console.log(data.analyzedInstructions)
    data.analyzedInstructions[0].steps.forEach((s) => {
        steps.push(s.step)
    })
    const ingred = []
    data.extendedIngredients.forEach((r) => {
        ingred.push(r.original);
      });      
    let recipe = await Recipe.findOne({ 'id' : id })
    if (!recipe) {
        const newRecipe = {
            id: id,
            title: data.title,
            ingredients: ingred,
            instructions: steps,
            totalTime: data.readyInMinutes,
            cuisines: data.cuisines,
            image: data.image,
        }
        recipe = await Recipe.create(newRecipe);
    };
    res.render('recipes/show', { title: `CookUp: ${data.title}`, recipeData: data, steps});
}

async function index(req, res, next) {
    const input = req.query.input;
    if (!input) {
        const recipeData = await fetch(`${ROOT_URL}/recipes/random?apiKey=${token}&number=6`)
            .then(res => res.json());
        return res.render('recipes/homepage', { recipeData: recipeData });
    }
    const recipeData = await fetch(`${ROOT_URL}/recipes/complexSearch?apiKey=${token}&query=${input}`)
        .then(res => res.json());
    res.render('recipes/index', { recipeData, title: `CookUp: ${input}` });
}