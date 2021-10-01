const mongoose = require('mongoose');

const db = 'mongodb+srv://hui-zhen:huizhen312@cluster0.rfozx.mongodb.net/RecipeDB?retryWrites=true&w=majority';

mongoose.connect(db)
.then(()=>{
    console.log("Connect successfully")
})
.catch((err)=>{
    console.log(err)
})

const mySchema = new mongoose.Schema({
    foodTitle: {type: String},
    foodAisle: {type: String},
    foodImage: {type: String},
    recipeName: {type: String},
    recipeImage: {type: String},
    recipeCalories: {type: String}
});

const Food = mongoose.model('recipes', mySchema);

module.exports = Food;