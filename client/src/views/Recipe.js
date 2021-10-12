//import '/assets/App.css';
import axios from 'axios';
import React, { useState } from 'react';
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
  ListInlineItem,
  Modal,
  ModalBody
} from 'reactstrap';

function Recipe({foodList}) {

  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    setModal(!modal);
  };

  const deleteRecipe = (id) => {
    console.log(id)
    axios.delete(`/recipe/${id}`)
    .then((res) => {
      window.location.reload(false);
    })
    .catch(err => console.log(err));

  }

  return (
    <div className="section">
      <Container className="container-top">
        <div>
          <Row> 
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
                    <Col lg="4">
                      <Card key={key}>
                        <CardImg top width="100%" src={food.recipeImage} alt="Card image cap" />
                        <CardBody>
                          <Link to={`/recipe/${food._id}`}>
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
                          <Link to={`/recipe/${food._id}`}>
                            <Button color="success">View More</Button>
                          </Link>
                          <Button color="danger" onClick={toggleModal}className="delete-search">Delete</Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    {/*Modal*/}
                    <Modal
                      className="modal-mini modal-primary"
                      isOpen={modal}
                      toggle={toggleModal}
                    >
                      <ModalBody className="text-center justify-content-center">
                          <i className="fa fa-lightbulb-o modal-profile" aria-hidden="true"></i>
                          <h5 className="small-title" style={{fontWeight:"400"}}>Are you sure want delete this chapter?</h5>
                      </ModalBody>
                      <div className="modal-footer">
                          <div className="custom-left-side">
                            <Button
                              className="btn-link"
                              color="default"
                              type="button"
                              onClick={toggleModal}
                              >
                              Cancel
                            </Button>
                          </div>
                          <div className="divider" />
                          <div className="custom-right-side">
                            <Button className="btn-link" onClick={()=>deleteRecipe(food._id)} color="default" type="button">
                              Delete
                            </Button>
                          </div>
                      </div>
                  </Modal>    
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