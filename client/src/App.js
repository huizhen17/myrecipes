//import '/assets/App.css';
import React, {useState , useEffect} from 'react';
import axios from 'axios';
import {
  Form,
  InputGroup,
  Input,
  FormGroup,
  Button,
  Container
} from 'reactstrap';

import Home from './views/Home';
import HomeNavbar from './components/HomeNavbar';

function App() {

  const [search, setSearch] = useState('');
  const [foodList, setFoodList] = useState([]);

  useEffect(()=>{
    fetchFoodList()
  },[search])

  const fetchFoodList = async() =>{
    await axios.get('http://localhost:5000/')
    .then(res => setFoodList(res.data))
    .catch(error => console.log(error));
  }

  const updateSearch = e => {
    setSearch(e.target.value); 
  };

  const handleSearch = async(e) => {
    e.preventDefault()

    const searchQuery = {search}
    await axios.post("/search",searchQuery)
      .then((res) => {
          console.log(res.data)
          //window.location.reload(false);
      })
      .catch(err=>{console.log(err)})
    
    setSearch('');
  }

  return (
    <>
    <HomeNavbar/>
    <div className="App">
      <div className="search-container">
        <h3 className="text-center title">Welcome to the Food Heaven...</h3>
        <Container className="container-md">
          <Form className="search-form" onSubmit={handleSearch} method="POST" encType="multipart/form-data">
            <InputGroup className="form-group-no-border" >
                <Input className="write-form" name="search" value={search} onChange={updateSearch} placeholder="Looking for some foods or menu...."  type="text" required/>
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
        </Container>
      </div>        
      <Home foodList={foodList}/>
    </div>
    </>
  );
}

export default App;
