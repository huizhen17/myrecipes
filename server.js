const express = require("express");
const axios = require('axios');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./routes/verifyJWToken');

const Food = require('./models/recipe.js');
const User = require('./models/user.js');
const Favourite = require('./models/favourite.js');

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
var foodList = [];

//Routes
//Get back all history data from MongoDb 
// app.get('/',(req,res)=>{
//     Food.find().sort({createdAt: -1})
//     .then(food => res.json(food))
//     .catch(err => res.status(400).json(`Error: ${err}`));
// });

//Perform Register
app.post('/register',async (req,res)=>{

    //Checking if user email is already in the database
    const emailExist = await User.findOne({email: req.body.signUpEmail});
    if(emailExist){
        return res.status(400).send('User already registered.');
    }

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.signUpPass, salt);
    const hashRePassword = await bcrypt.hash(req.body.signUpRePass, salt);

    //Create a new user
    const user = new User({
        name: req.body.signUpName,
        email: req.body.signUpEmail,
        password: hashPassword,
        repassword: hashRePassword
    });

    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).json(`Error: ${err}`);
    }
});

//Perform Login
app.post('/login', async(req, res)=>{

    const user = await User.findOne({email: req.body.loginEmail});

    //Check if the email exists
    if(!user){
        return res.status(400).send('Email does not exists.');
    }

    //Check if password is valid
    const validPass = await bcrypt.compare(req.body.loginPass, user.password);
    if(!validPass){
        return res.status(400).send('Invalid Password.');
    }

    //Create and assign a token when login
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    //res.header('auth-token',token).send(token);

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token
    });
});

//Request to search for a food and add to MongoDb
app.post('/search',(req,res)=>{
    
    foodList = []; //clear previous data 

    const foodName = req.body.search
    const queryStr = `https://api.spoonacular.com/food/ingredients/search?apiKey=${apikey}&query=${foodName}&number=1&metaInformation=true`
    const queryRec = `https://api.edamam.com/search?q=${foodName}&app_id=ceafc23b&app_key=${recApiKey}`;

    axios.get(queryStr).then((response)=>{   
        foodUnit = response.data.results[0].possibleUnits
        foodAisle = response.data.results[0].aisle

        axios.get(queryRec).then((response)=>{
            for(var i = 0; i < response.data.hits.length ; i++){
                //check if property exists
                if(response.data.hits[i].recipe.hasOwnProperty('label')){
                    recName = response.data.hits[i].recipe.label;
                }else{
                    recName = "";
                }
                if(response.data.hits[i].recipe.hasOwnProperty('image')){
                    recImage = response.data.hits[i].recipe.image
                }else{
                    recImage = "";
                }
                if(response.data.hits[i].recipe.hasOwnProperty('ingredientLines')){
                    recIngredient = response.data.hits[i].recipe.ingredientLines 
                }else{
                    recIngredient = "";
                }
                if(response.data.hits[i].recipe.hasOwnProperty('mealType')){
                    recMeal = response.data.hits[i].recipe.mealType[0]
                }else{
                    recMeal = "";
                }
                if(response.data.hits[i].recipe.hasOwnProperty('dishType')){
                    recDish = response.data.hits[i].recipe.dishType[0]
                }else{
                    recDish = "";
                }

                var singleFood = {
                    foodTitle: foodName,
                    foodAisle: foodAisle,
                    foodUnit: foodUnit,
                    recipeName: recName,
                    recipeImage: recImage,
                    recipeIngredient: recIngredient,
                    recipeMealType: recMeal,
                    recipeDishType: recDish
                };

                foodList.push(singleFood) //store in array
            }

            
            // foodValue = new Food ({
            //     foodTitle: foodName,
            //     foodAisle: foodAisle,
            //     foodUnit: foodUnit,
            //     recipeName: recName,
            //     recipeImage: recImage,
            //     recipeIngredient: recIngredient,
            //     recipeMealType: recMeal,
            //     recipeDishType: recDish
            // });
        
            // foodValue.save().then(result=> {
            //     console.log("Success");
            // })
            // .catch (error=> {
            //     console.log("Error" + error);
            // }); 

            res.json(foodList)
        })

    })
    .catch (error=> {
        console.log("Error" + error);
        res.status(400).send(`Sorry we can't find what you want..`);
    }); 
})

// //Get Specific Menu from ID
// app.get('/recipe/:id', (req, res)=>{
//     Food.findById(req.params.id)
//     .then(food => res.json(food))
//     .catch(err => res.status(400).json(`Error ${err}`));
// })

//Store recipe into favourite collection
app.post('/recipe/:id', (req, res)=>{
    //store into new schema
    favValue = new Favourite ({
        recipeID: req.params.id,
        recipeName: req.body.recTitle,
        recipeImage: req.body.recImg,
        recipeIngredient: req.body.recIng,
        recipeMealType: req.body.recMeal,
        recipeDishType: req.body.recDish,
        userID: req.body.userid
    });

    favValue.save().then(result=> {
        res.json(result);
    })
    .catch (error=> {
        console.log("Error" + error);
    }); 
})

//Find the favourite data that match with the user ID and recipe ID
app.post('/favourited', (req, res)=>{
    Favourite.find({"userID":req.body.userid, "recipeID": req.body.rectitle})
    .then(favourite => {
        let result = false;
        if(favourite.length !== 0){
            result = true //Favourite menu found
        }
        res.status(200).json({success: true, favorited: result});
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
})

//Delete Favoruite 
app.post('/removefav',(req, res)=>{
    Favourite.findOneAndDelete({"userID":req.body.userid, "recipeID": req.body.recTitle})
    .then(() => res.send("The menu is deleted from your favourite"))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

//Get all favourites that match with User ID and sort based on the date
app.get('/favourite/:id',(req,res)=>{
    Favourite.find({"userID": req.params.id}).sort({updatedAt: -1})
    .then(food => res.json(food))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//Update the favourite based on the favourite ID
app.put("/favourite/:id", (req, res)=>{
    Favourite.findOneAndUpdate( {_id: req.params.id},{
        recipeName: req.body.recipeTitle
    })
    .then(food => {
        res.json("The menu is updated successfully")
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
})

//Delete Recipe By ID
// app.delete('/:id',(req, res)=>{
//     Food.findByIdAndDelete(req.params.id)
//     .then(() => res.send("The menu is deleted"))
//     .catch(err => res.status(400).json(`Error: ${err}`))
// })

app.listen(port, ()=>console.log(`App is running on Port: ${port}`));