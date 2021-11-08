
import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Form,
    Input,
    Jumbotron,
    CardBody,
    Card,
    Button,
    FormGroup,
    InputGroupText,
    InputGroupAddon,
    InputGroup,
    Alert
} from "reactstrap";
import { axiosInstance } from '../config';

function Login() {

    const history = useHistory();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [error, setError] = useState("");
    // const [loading, setLoading] = useState(false);

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = (value) => {
        setPasswordShown(value);
    };

    const loginAccount = async(e) =>{
        e.preventDefault();

        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            await axiosInstance.post("/login", {loginEmail, loginPass} , config)
            .then((res)=>{
                //setLoginUser(res.data);
                localStorage.setItem("userinfo", JSON.stringify(res.data));
                //console.log(res.data);
                setError("");
                history.push('/');    
            })

        } catch (error) {
            setError(error.response.data);
            console.log(error.response.data);
        }
    }

    useEffect(async() => {
        await getLocalUsers();
      },[]);
    
    const getLocalUsers = async() => {
        let users = await JSON.parse(await localStorage.getItem('userinfo'));

        if(users.length !== 0){
            history.push('/');
        }      
    };

    return (
        <div>
            <div className="main-login-section" style={{backgroundImage:"url(" + require("../assets/img/login-section.jpg").default + ")", opacity: 1}}>
                <Container>
                    <Row>
                        <Col/>
                        <Col lg="6" style={{alignSelf:"center"}}>
                            <Jumbotron>
                                <Card>
                                    <CardBody className="m-4">
                                        <Form className="login-form" onSubmit={loginAccount}>                                          
                                            <h2 className="title no-margin-top" >Welcome Back</h2>
                                            <p className="title">Sign in to your account.</p>
                                            <FormGroup className="login-form-group">
                                                <Input className="loginFormInput" autoFocus required placeholder="Email" type="email" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
                                            </FormGroup>
                                            <FormGroup className="login-form-group">
                                                <InputGroup>
                                                <Input className="loginFormInput password-field" required placeholder="Password"  type={passwordShown ? "text" : "password"} value={loginPass} onChange={(e)=>setLoginPass(e.target.value)}/>
                                                    <InputGroupAddon addonType="append">
                                                        <InputGroupText className="inputPasswordIcon">
                                                            <i className={passwordShown ? "fa fa-eye-slash" : "fa fa-eye"} onClick={()=>togglePasswordVisiblity(!passwordShown)} aria-hidden="true"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormGroup>
                                            { error && 
                                                <Alert color="danger">
                                                    {error}
                                                </Alert>
                                            }                                            
                                            <div className="login-button-container">    
                                                <Button block className="btn-round sign-in-btn" color="success" type="submit">
                                                    Sign In
                                                </Button>
                                                <Link to="/signup">
                                                <Button block className="link" type="button" color="link">
                                                    Create Account
                                                </Button>
                                                </Link>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Jumbotron>
                        </Col>
                        <Col/>
                    </Row>
                </Container>
            </div>   
        </div>
    )
}

export default Login
