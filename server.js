const express = require("express")
const axios = require('axios')
const Food = require('./db.js')
const app = express()

const apikey = 'c542d865610548498eb163bdfc8f5417';
const recApiKey = '8126f740d23c493ab9f75a8924bc3131';

//const foodName = 'chicken';

var foodImage, foodAisle, recName, recImage, recCalories;


app.get('/getMenu',(req,res)=>{

    const foodName = req.query.food

    const queryStr = `https://api.spoonacular.com/food/ingredients/search?apiKey=${apikey}&query=${foodName}&number=1&metaInformation=true`
    const queryRec = `https://api.edamam.com/search?q=${foodName}&app_id=ceafc23b&app_key=${recApiKey}`;

    axios.get(queryStr).then((response)=>{    
        foodImage = response.data.results[0].image
        foodAisle = response.data.results[0].aisle

        axios.get(queryRec).then((response)=>{
            recName = response.data.hits[0].recipe.label;
            recImage = response.data.hits[0].recipe.image;
            recCalories = response.data.hits[0].recipe.calories;

            foodValue = new Food ({
                foodTitle: foodName,
                foodAisle: foodAisle,
                foodImage: foodImage,
                recipeName: recName,
                recipeImage: recImage,
                recipeCalories: recCalories
            });
        
            foodValue.save().then(result=> {
                console.log("Success" + result);
            })
            .catch (error=> {
                console.log("Error" + error);
            }); 
            
            res.send("<h1>Hello</h1><br/> " + recName + " <br/>" + recCalories);
        })

    });
});


app.listen(5000);