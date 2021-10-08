import './App.css';
import React, {useState , useEffect} from 'react';
import { Router} from "react-router-dom";
import axios from 'axios';

import {
  Form,
  Label,
  InputGroup,
  Input,
  FormGroup,
  Button,
  Container
} from 'reactstrap';

function App() {

  const [search, setSearch] = useState("");
  const [foodList, setFoodList] = useState([]);

  // const handleSearch = (e) => {
  //   e.preventDefault()
  // }

  useEffect(()=>{
    axios.get('http://localhost:5000/')
    .then(res => setFoodList(res.data))
    .catch(error => console.log(error));
  },[])

  return (
    <div className="App">
      <Container>
        <Form action="/quotes" method="POST">
          <Label>Book Title</Label>
          <InputGroup className="form-group-no-border" >
              <Input className="write-form" name="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Looking for some foods or menu...."  type="text" required/>
          </InputGroup>
          <FormGroup>
            <Button
              className="mr-1"
              color="success"
              type="submit"
            >
                Search
            </Button>
          </FormGroup>
        </Form>
        <div>
          <h3>Welcome to the Food Heaven...</h3>
          {foodList.map((food, key)=>{
            return(
              <>
                <div className="image-container">
                  <p>Food Title: {food.foodTitle}</p>
                  <p>Food Aisle: {food.foodAisle}</p>
                  <img src={food.recipeImage} alt="Food Image"/>
                </div>
              </>
            )
          })}
        </div>
      </Container>
    </div>
  );
}

export default App;
