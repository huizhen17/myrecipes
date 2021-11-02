import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HomeNavbar from '../components/HomeNavbar';

import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Alert
  } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function SingleRecipe(props) {

    const recipeID = props.match.params.id;

    const [recTitle, setRecTitle] = useState("");
    const [recImg, setRecImg] = useState("");
    const [recIng, setRecIng] = useState([]);
    const [recMeal, setRecMeal] = useState("");
    const [recDish, setRecDish] = useState("");
    const [id, setID] = useState("");
    const [user, setLoginUser] = useState({});
    const [error, setError] = useState("");

    const [favorited, setFavorited] = useState(false); //to set the favourite button
    const [visible, setVisible] = useState(false);

    const history = useHistory();

    window.setTimeout(() => { 
        setVisible(false);
    }, 6000);
    
    useEffect(() => {
        const fetchUser = async() => {
            if(localStorage.getItem('userinfo') === null){
                localStorage.setItem('userinfo',JSON.stringify([]));
                setLoginUser([]);
            }else{
                let user = await JSON.parse(localStorage.getItem('userinfo'));
                setLoginUser(user);
                setID(user._id);
                let userid = user._id;
                await axios.post(`/favourited`,{userid, recipeID})
                .then((res) => {
                    if(res.data.success){
                        setFavorited(res.data.favorited);
                    }
                })
                .catch((err)=>{
                    setError(err.response.data);
                })
            }
        }

        fetchUser()
    },[]);

    useEffect(async()=>{
        await axios.get(`/recipe/${props.match.params.id}`)
        .then((res) => {
            setRecTitle(res.data.recipeName);
            setRecImg(res.data.recipeImage);
            setRecIng(res.data.recipeIngredient);
            setRecMeal(res.data.recipeMealType);
            setRecDish(res.data.recipeDishType);
        })
        .catch((err)=>{
            setError(err.response.data);
        })
    },[])
    
    const addFavourite = async(userid,favor) => {
        if(userid != null){
            if(favor === true){
                //remove from favourite db
                await axios.post("/removefav",{userid,recipeID})
                .then((res) => {
                    setFavorited(false);
                    setVisible(true);
                })
                .catch(err => console.log(err));
            }else{
                await axios.post(`/recipe/${recipeID}`, {userid, recTitle, recImg, recIng, recMeal, recDish})
                .then((res) => {
                    console.log("Added to Favourite")
                    setFavorited(true); //change button colour
                })
                .catch((err)=>{
                    setError(err.response.data);
                })
            }
        }else{
            history.push("/login");
            console.log(favor);
        }
        
    }

    return (
        <>
        <HomeNavbar user={user}/>
        <div className="main-section">
            <Container>
                {error && <h3>{error}</h3>}
                <Row>
                    <Col>
                        <img className="single-recipe-image"  src={recImg === null ? require("../assets/img/menu_placeholder.png").default : recImg } alt="Food"/>
                    </Col>
                    <Col>
                        <div>
                            <h3 className="title">{recTitle}</h3>
                        </div>
                        <div>
                            <Row>
                                <Col>   
                                    <div className="text-center recipe-type">
                                        <h5 className="small-title">Meal Type</h5>
                                        <img className="recipe-icon" draggable="false" src={require("../assets/img/breakfast.png").default} alt="meal-icon" />
                                        <p className="meal-type-text">{recMeal}</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="text-center recipe-type">
                                        <h5 className="small-title">Dish Type</h5>
                                        <img className="recipe-icon" draggable="false" src={require("../assets/img/serving.png").default} alt="serve-icon" />
                                        <p className="dish-type-text">{recDish}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h5 className="title">Ingredients</h5>
                            <Table bordered>
                                <tbody>
                                    {recIng.map((ingredient,key)=>{
                                        return (
                                            <tr key={key}>
                                                <th scope="row">{key+1}</th>
                                                <td>{ingredient}</td>
                                            </tr>
                                        )
                                    })}  
                                </tbody>
                            </Table>
                        </div>
                        <Button block className={`btn-round small-title ${favorited ? "btn-warning" : "btn-success"}`} onClick={()=>addFavourite(user._id,favorited)} >
                            {favorited ? "Remove from Favourite" : "Add to Favourite" }
                        </Button>
                    </Col>
                    <Alert className="alert-fav" color="warning" isOpen={visible}>
                        <i class="fa fa-info-circle" aria-hidden="true"></i> Successfully remove from favourite!
                    </Alert>
                </Row>
            </Container>
        </div>
        
    <footer className="footer footer-black footer-white">
        <Container>
            <div className="credits ml-auto text-center">
                <span className="copyright">
                    © {new Date().getFullYear()} powered by{" "}Spoonacular and Edaman
                </span>
            </div>
        </Container>
    </footer>
        </>
    )
}

export default SingleRecipe
