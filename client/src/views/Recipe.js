//import '/assets/App.css';
import React from 'react';
import {Link} from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';

function Recipe({foodList}) {

  return (
    <div className="section">
      <Container className="container-top">
        <div>
          <Row> 
            {foodList.length === 0 ?
              <>
              <div style={{marginLeft:"20px"}}>
                  <h3 className="text-success text-center title">Swipe to up and Search Your Favourite Food Now!</h3>
              </div>
              </>
            : foodList.map((food, key)=>{
                return(
                <>
                    <Col lg="4">
                        <div className="image-container" key={key}>
                            <Link to={`/${food._id}`}>
                              <h3>{food.foodTitle}</h3>
                            </Link>
                            <p>Food Aisle: {food.foodAisle}</p>
                            <div>
                              {food.foodUnit.map((unit,index)=>{
                                  return <Button className="foodunit-btn" key={index} color="warning" disabled> {unit} </Button>
                              })}                            
                            </div>
                            <p>Related Menu: {food.recipeName}</p>
                            <img src={food.recipeImage} alt="Food"/>
                        </div>
                    </Col>
                </>
                )
            })}                    
            </Row>
        </div>
      </Container>
    </div>
  );
}

export default Recipe;
