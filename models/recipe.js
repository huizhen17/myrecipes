const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const db = process.env.MONGO_URL;

mongoose.connect(db, {
    useNewUrlParser: true
})
.then(()=>{
    console.log("Connect successfully")
})
.catch((err)=>{
    console.log(err)
})

const mySchema = new mongoose.Schema({
    foodTitle: {
        type: String
    },
    foodAisle: {
        type: String
    },
    foodUnit: {
        type: Array
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
    }
},{timestamps: true});

const Food = mongoose.model('recipes', mySchema);

module.exports = Food;