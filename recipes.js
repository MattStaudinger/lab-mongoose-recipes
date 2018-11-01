const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



const recipesSchema = new Schema ({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: [],
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ["Breakfast","Dish", "Snack", "Drink","Dessert", "Other"]},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
})

const Recipes = mongoose.model ("Recipes", recipesSchema)


let createRecipe = Recipes.create ({
  title: "Noodles plain",
  duration: 14,
  cuisine: "Good cuisine"})
.then((recipe)=> {
  console.log("recipe: ", recipe)
});


let insertRecipe = Recipes.insertMany(
  data)
.then((recipe)=> {
  console.log("recipe: ", recipe)
});


let recipeUpdate = Recipes.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
.then((recipe)=> {console.log(recipe)})

let recipeRemove = Recipes.deleteOne({title: "Carrot Cake"})
.then (()=> {console.log("Gone!")})


Promise.all([createRecipe,insertRecipe,recipeRemove,recipeUpdate])
.then(()=> {
    console.log("It's all done!")
mongoose.connection.close()
.then (()=> {console.log("Closed")})
 })
 .catch(()=> {
   console.log("Erroooor!")
 })

