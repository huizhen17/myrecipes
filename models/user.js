const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const db = "mongodb+srv://hui-zhen:huizhen312@cluster0.rfozx.mongodb.net/RecipeDB?retryWrites=true&w=majority";

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
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    repassword: {
        type: String,
        required: true
    }
},{timestamps: true});

const User = mongoose.model('users', mySchema);

module.exports = User;