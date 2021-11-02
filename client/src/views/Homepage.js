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

import Recipe from '../views/Recipe';
import HomeNavbar from '../components/HomeNavbar';

function Homepage() {

  const [search, setSearch] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    fetchFoodList()
  },[search])

  const fetchFoodList = async() =>{
    const config = {
      headers: {
          "Content-type": "application/json",
      },
    };

    await axios.get('http://localhost:5000/',config)
    .then((res) => {
      if(res.data.length > 0) {
        setFoodList(res.data)
      }else{
        setFoodList([]);
      }
    })
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
    .catch((err)=>{
      setError(err.response.data);
    })
    
    setSearch('');
  }

  const [user, setLoginUser] = useState({});

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

  return (
    <>
    <HomeNavbar user={user}/>
    <div>
      <div className="search-container" 
          style={{
          backgroundImage:
            "url(" + require("../assets/img/main-header.png").default + ")", opacity: 1, 
        }}>
        <h2 className="header-text text-center title">Welcome to the Food Heaven...</h2>
        <Container className="container-md">
          <Form className="search-form" onSubmit={handleSearch} method="POST" encType="multipart/form-data">
            <InputGroup className="form-group-no-border" >
                <Input className="search-input" name="search" value={search} onChange={updateSearch} placeholder="Looking for some ingredients or menu...."  type="text" required/>
            </InputGroup>
            <FormGroup>
              <Button
                className="mr-1 search-btn"
                color="success"
                type="submit"
              >
                  Search
              </Button>
            </FormGroup>
          </Form>
          <p className={`${error !== null ? "errorMessage display-block" : "display-none"}`} color="danger">
            <i className="fa fa-exclamation-circle error-icon"/>{error}
          </p>
        </Container>
      </div>        
      <Recipe foodList={foodList}/>
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
  );
}

export default Homepage;
