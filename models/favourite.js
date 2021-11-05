const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const db = process.env.MONGO_URL;

mongoose.connect(db, {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(()=>{
    console.log("Connect successfully")
})
.catch((err)=>{
    console.log(err)
})

const mySchema = new mongoose.Schema({
    recipeID: {
        type: String
    },
    recipeName: {
        type: String
    },
    recipeImage: {
        type: String
    },
    recipeIngredient: {
        type: Array
    },
    recipeMealType: {
        type: String
    },
    recipeDishType: {
        type: String
    },
    userID: {
        type: String
    }
},{timestamps: true});

const Favourite = mongoose.model('favourites', mySchema);

module.exports = Favourite;