const express = require("express")
const axios = require('axios')
const cors = require('cors');

const Food = require('./models/recipe.js')

const app = express()
const port = process.env.PORT || 5000

//Middleware
app.use(cors());
app.use(express.json()); //parse anything into JSON

const dotenv = require('dotenv')
dotenv.config()

const apikey = process.env.SPOONACULAR_API_KEY;
const recApiKey = process.env.EDAMAN_API_KEY;

var foodUnit, foodAisle, recName, recImage, recIngredient, recMeal, recDish;

//Routes
//Get back all history data from MongoDb 
app.get('/',(req,res)=>{
    Food.find().sort({createdAt: -1})
    .then(food => res.json(food))
    .catch(err => res.status(400).json(`Error: ${err}`));

});

//Request to search for a food and add to MongoDb
app.post('/search',(req,res)=>{
    
    const foodName = req.body.search
    const queryStr = `https://api.spoonacular.com/food/ingredients/search?apiKey=${apikey}&query=${foodName}&number=1&metaInformation=true`
    const queryRec = `https://api.edamam.com/search?q=${foodName}&app_id=ceafc23b&app_key=${recApiKey}`;

    axios.get(queryStr).then((response)=>{   
        foodUnit = response.data.results[0].possibleUnits
        foodAisle = response.data.results[0].aisle

        axios.get(queryRec).then((response)=>{
            recName = response.data.hits[0].recipe.label;
            recImage = response.data.hits[0].recipe.image;
            recIngredient = response.data.hits[0].recipe.ingredientLines;
            recMeal = response.data.hits[0].recipe.mealType[0]
            recDish = response.data.hits[0].recipe.dishType[0]

            foodValue = new Food ({
                foodTitle: foodName,
                foodAisle: foodAisle,
                foodUnit: foodUnit,
                recipeName: recName,
                recipeImage: recImage,
                recipeIngredient: recIngredient,
                recipeMealType: recMeal,
                recipeDishType: recDish
            });
        
            foodValue.save().then(result=> {
                console.log("Success" + result);
            })
            .catch (error=> {
                console.log("Error" + error);
            }); 

            res.send("Success")
        })

    })
    .catch (error=> {
        console.log("Error" + error);
        res.status(400).send(`Sorry we can't find what you want..`);
    }); 

    //console.log("Hello");
})

//Get Specific Menu from ID
app.get('/recipe/:id', (req, res)=>{
    console.log("Read Food based on ID")
    Food.findById(req.params.id)
    .then(food => res.json(food))
    .catch(err => res.status(400).json(`Error ${err}`));
})

app.put("/update/:id", (req, res)=>{
    console.log("Update food based on the ID")
    Food.findById(req.params.id)
    .then(food => {
        food.foodTitle = req.body.title;
        food.foodAisle = req.body.aisle;
        food.foodUnit = req.body.unit;
        food.recipeName = req.body.name;
        food.recipeImage = req.body.image;
        food.recipeIngredient = req.body.ingredient;

        food.save()
        .then(() => res.json("The menu is updated successfully"))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
})

app.delete('/recipe/:id', (req, res)=>{
    Food.findByIdAndDelete(req.params.id)
    .then(() => res.json("The menu is deleted"))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

app.listen(port, ()=>console.log(`App is running on Port: ${port}`));