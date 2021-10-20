import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HomeNavbar from '../components/HomeNavbar';

import {
    Container,
    Row,
    Col,
    Table,
    Button
  } from 'reactstrap';

function SingleRecipe(props) {

    const [recTitle, setRecTitle] = useState("");
    const [recImg, setRecImg] = useState("");
    const [recIng, setRecIng] = useState([]);
    const [recMeal, setRecMeal] = useState("");
    const [recDish, setRecDish] = useState("");

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
                //setError(err.response.data);
            })
    },[])


    return (
        <>
        <HomeNavbar/>
        <div className="main-section">
            <Container>
                <Row>
                    <Col>
                        <img className="single-recipe-image"  src={recImg} alt="Food"/>
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
                                            <tr>
                                                <th scope="row">{key+1}</th>
                                                <td>{ingredient}</td>
                                            </tr>
                                        )
                                    })}  
                                    
                                </tbody>
                            </Table>
                        </div>
                        <Button block className="btn-round small-title" color="success">
                            Update
                        </Button>
                    </Col>
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
