//import '/assets/App.css';
import React, {useState , useEffect, useRef} from 'react';
import {axiosInstance} from '../config';
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

  const [user, setLoginUser] = useState({});

  const titleRef = useRef(null)
  
  useEffect(() => {
    getLocalUsers();
  },[]);

  const getLocalUsers = async() => {
    if(localStorage.getItem('userinfo') === null){
      localStorage.setItem('userinfo',JSON.stringify([]));
      setLoginUser([]);
    }else{
      let user = await JSON.parse(localStorage.getItem('userinfo'));
      setLoginUser(user);
    }
  };
  
  useEffect(() => {
    getLocalRecipe();
  },[search]);

  const getLocalRecipe = async() => {
    if(localStorage.getItem('recipeinfo') === null){
      localStorage.setItem('recipeinfo',JSON.stringify([]));
    }else{
      let recipe = await JSON.parse(localStorage.getItem('recipeinfo'));
      setFoodList(recipe);
    }
  };

  const updateSearch = e => {
    setSearch(e.target.value); 
  };

  const handleSearch = async(e) => {
    e.preventDefault()
    const searchQuery = {search}

    await axiosInstance.post("/search",searchQuery)
    .then((res) => {
        setError(null);
        if(res.data.length > 0) {
          setFoodList(res.data)
          localStorage.setItem("recipeinfo", JSON.stringify(res.data));
          window.scrollTo({top: titleRef.current.offsetTop, behavior: "smooth"})
        }else{
          setFoodList([]);
        }
    })
    .catch((err)=>{
      setError(err.response.data);
      localStorage.setItem('recipeinfo',JSON.stringify([]));
    })
    
    setSearch('');
  }

  const searchOnClick = async(search) => {
    const searchQuery = {search};
    await axiosInstance.post(`/search`,searchQuery)
    .then((res) => {
        setError(null);
        if(res.data.length > 0) {
          setFoodList(res.data)
          localStorage.setItem("recipeinfo", JSON.stringify(res.data));
          window.scrollTo({top: titleRef.current.offsetTop, behavior: "smooth"})
        }else{
          setFoodList([]);
        }
    })
    .catch((err)=>{
      setError(err.response.data);
      localStorage.setItem('recipeinfo',JSON.stringify([]));
    })
    
    setSearch('');
  }

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
                <Input className="search-input" name="search" value={search} onChange={updateSearch} placeholder="Looking for some ingredients...."  type="text" required/>
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
          <div className="text-center suggestion"> 
            <p><i>Suggestion: </i></p>
            <p className="suggestion-item" onClick={()=>searchOnClick("apple")}><i>Apple </i></p>
            <p className="suggestion-item" onClick={()=>searchOnClick("broccoli")}><i>Broccoli </i></p>
            <p className="suggestion-item" onClick={()=>searchOnClick("cabbage")}><i>Cabbage </i></p>
            <p className="suggestion-item" onClick={()=>searchOnClick("pumpkin")}><i>Pumpkin </i></p>
          </div>
          <p className={`${error !== null ? "errorMessage display-block" : "display-none"}`} color="danger">
            <i className="fa fa-exclamation-circle error-icon"/>{error}
          </p>
        </Container>
      </div> 
      <div ref={titleRef}>
        <Recipe foodList={foodList}/>
      </div>       
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
