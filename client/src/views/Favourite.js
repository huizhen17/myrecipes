import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
  CardBody,
  Card,
  CardText,
  CardTitle,
  Button,
  CardSubtitle,
  Container,
  Row,
  Col
} from "reactstrap"
import HomeNavbar from '../components/HomeNavbar';

function Favourite() {
    const [user, setLoginUser] = useState({});
    const [favList, setFavList] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
      getLocalUsers();
    },[]);
  
    const getLocalUsers = () => {
      if(localStorage.getItem('userinfo') === null){
        localStorage.setItem('userinfo',JSON.stringify([]));
        setLoginUser([]);
      }else{
        let user = JSON.parse(localStorage.getItem('userinfo'));
        setLoginUser(user);
      }
    };

    useEffect(()=>{
      fetchFavList()
    },[])
  
    const fetchFavList = async() =>{
      const config = {
        headers: {
            "Content-type": "application/json",
        },
      };
  
      await axios.get('http://localhost:5000/favourite',config)
      .then((res) => {
        if(res.data.length > 0) {
          setFavList(res.data)
        }else{
          setFavList([]);
        }
      })
      .catch(error => setError(error));
    }

    return (
        <>
        <HomeNavbar user={user}/>
        <div className="main-section">
          <Container>
            <h3 className="title text-center">My Favourite</h3>
            {console.log(favList)}
            <Row>
            {favList.length === 0 ?
              <>
              <div className="swipe-up-container title">
                  <h3 className="text-success text-center title">Save Your Food Right Now!</h3>
              </div>
              </>
            : 
              favList.map((food, key)=>{
                return(
                  <>
                    <Col lg="4" key={key}>
                      <Card>
                        <CardBody>
                          <CardTitle tag="h4" className="small-title">{food.recipeName}</CardTitle>
                          <CardSubtitle>{food.recipeMealType} | {food.recipeDishType}</CardSubtitle>
                        </CardBody>
                        <img width="100%" draggable="false" src={food.recipeImage === null ? require("../assets/img/menu_placeholder.png").default : food.recipeImage } alt="Card image cap" />
                        <CardBody>
                        <CardText>
                          <h5 className="small-title">Ingredients:</h5>
                          {food.recipeIngredient.map((ingredient,key)=>{
                            if(ingredient === food.recipeIngredient[food.recipeIngredient.length-1]){
                              return (ingredient) 
                            }
                            return (
                                ingredient + " - "
                            )
                          })}  
                          </CardText>
                          <div style={{margin:"20px 0 10px 0"}}>
                          <Link to={`/recipe/${food._id}`}>
                            <Button color="success">Update</Button>
                          </Link>
                          <Button color="warning" className="delete-search">Remove</Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </>
               )
              })}    
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

export default Favourite
