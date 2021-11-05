//import '/assets/App.css';
import React from 'react';
import {Link} from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
  List,
  ListInlineItem
} from 'reactstrap';

function Recipe({foodList}) {

  return (
    <div className="section">
      <Container className="container-top">
        <div>
          <Row > 
            {foodList.length === 0 ?
              <>
              <div className="swipe-up-container">
                  <h3 className="text-success text-center title">Swipe to up and Search Your Favourite Food Now!</h3>
              </div>
              </>
            : 
              foodList.map((food, key)=>{
                return(
                <>
                    <Col className="search-row-container" lg="4" md="6" key={key}>
                      <Card>
                        <Link to={`/recipe/${key}`}>
                          <CardImg top width="100%" draggable="false" src={food.recipeImage === null ? require("../assets/img/menu_placeholder.png").default : food.recipeImage } alt="Card image cap" />
                        </Link>
                        <CardBody>
                          <Link to={`/recipe/${key}`}>
                            <CardTitle tag="h5" className="small-title pointer">{food.recipeName}</CardTitle>
                          </Link>
                          <CardSubtitle tag="h6" className="mb-2 text-muted default">{food.foodTitle} | {food.foodAisle}</CardSubtitle>
                          <div>
                            <List type="inline" className="default foodunit">
                              {food.foodUnit.map((unit,key)=>{
                                return (
                                  <ListInlineItem className="listinline-item" key={key}>{unit}</ListInlineItem>
                                )
                              })}   
                            </List>                         
                          </div>
                          <div style={{margin:"20px 0 10px 0"}}>
                          <Link to={`/recipe/${key}`}>
                            <Button color="success">View More</Button>
                          </Link>
                          {/* <Button color="danger" onClick={()=>toggleModal(`${food._id}`)} className="delete-search">Delete</Button> */}
                          </div>
                        </CardBody>
                      </Card>
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
