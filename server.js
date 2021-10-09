const express = require("express")
const axios = require('axios')
const cors = require('cors');

const Food = require('./db.js')

const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json()); //parse anything into JSON

const dotenv = require('dotenv')
dotenv.config()

const apikey = process.env.SPOONACULAR_API_KEY;
const recApiKey = process.env.EDAMAN_API_KEY;

//const foodName = 'pizza';

var foodUnit, foodAisle, recName, recImage, recCalories;


app.get('/',(req,res)=>{
    Food.find()
    .then(food => res.json(food))
    .catch(err => res.status(400).json(`Error: ${err}`));

});

//Request to search for a food and add to MongoDB
app.post('/search',(req,res)=>{

    const foodName = req.body.search
    const queryStr = `https://api.spoonacular.com/food/ingredients/search?apiKey=${apikey}&query=${foodName}&number=1&metaInformation=true`
    const queryRec = `https://api.edamam.com/search?q=${foodName}&app_id=ceafc23b&app_key=${recApiKey}`;

    axios.get(queryStr).then((response)=>{ 
        console.log(response.data.results[0].possibleUnits)   
        foodUnit = response.data.results[0].possibleUnits
        foodAisle = response.data.results[0].aisle

        axios.get(queryRec).then((response)=>{
            recName = response.data.hits[0].recipe.label;
            recImage = response.data.hits[0].recipe.image;
            recCalories = response.data.hits[0].recipe.calories;

            foodValue = new Food ({
                foodTitle: foodName,
                foodAisle: foodAisle,
                foodUnit: foodUnit,
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

    //res.send("Hello")
    //console.log("Hello");
})

//Request to find the food by ID
app.get('/:id', (req, res)=>{
    console.log("Read Food based on ID")
})

app.put("/update/:id", (req, res)=>{
    console.log("Update food based on the ID")
})

app.delete("/:id", (req, res)=>{
    console.log("Delete favourite food by ID")
})

app.listen(port, ()=>console.log(`App is running on Port: ${port}`));