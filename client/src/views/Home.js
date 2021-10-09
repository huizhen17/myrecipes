//import '/assets/App.css';
import React from 'react';

import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';

function Home({foodList}) {

  return (
    <div className="App">
      <Container>
        <div>
          <Row>        
            {foodList.map((food, key)=>{
                return(
                <>
                    <Col lg="4">
                        <div className="image-container" key={key}>
                            <p>Food Title: {food.foodTitle}</p>
                            <p>Food Aisle: {food.foodAisle}</p>
                            <div>
                                <p>Food Units: </p>
                                {food.foodUnit.map((unit,index)=>{
                                    return <Button className="foodunit-btn" key={index} color="warning" disabled> {unit} </Button>
                                })}                            

                            </div>
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

export default Home;
