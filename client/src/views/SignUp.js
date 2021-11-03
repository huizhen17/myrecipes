import axios from 'axios';
import React, {useState} from 'react'
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
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Alert
} from "reactstrap";

function SignUp() {

    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPass, setSignUpPass] = useState("");
    const [signUpRePass, setSignUpRePass] = useState("");

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = (value) => {
        setPasswordShown(value);
    };

    const [repasswordShown, setRePasswordShown] = useState(false);

    const toggleRePasswordVisiblity = (value) => {
        setRePasswordShown(value);
    };

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    const createAccount = async(e) => {
        e.preventDefault();

        if( signUpPass !== signUpRePass) {
            setMessage("Password Not Match.");
        }
        else{
            setMessage("");

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await axios.post("/register", {signUpName, signUpEmail, signUpPass, signUpRePass} , config);

                setError("");
                history.push("/login");

            } catch (error) {
                setError(error.response.data);
                console.log(error.response.data);
            }
        }
        
    } 

    return (
        <div>
            <div className="main-signup-section" style={{backgroundImage:"url(" + require("../assets/img/login-section.jpg").default + ")", opacity: 1}}>
                <Container>
                    <Row>
                        <Col/>
                        <Col lg="6" style={{alignSelf:"center"}}>
                            <Jumbotron>
                                <Card>
                                    <CardBody className="m-4">
                                        <Form className="login-form" onSubmit={createAccount}>                                          
                                            <h2 className="small-title no-margin-top" >Create a New Account</h2>
                                            <p className="small-title">It's quick and easy.</p>
                                            <FormGroup className="login-form-group">
                                                <Input className="loginFormInput" autoFocus required placeholder="Username" type="text" value={signUpName} onChange={(e)=>setSignUpName(e.target.value)}/>
                                            </FormGroup>
                                            <FormGroup className="login-form-group">
                                                <Input className="loginFormInput" required placeholder="Email" type="email" value={signUpEmail} onChange={(e)=>setSignUpEmail(e.target.value)}/>
                                            </FormGroup>
                                            <FormGroup className="login-form-group">
                                                <InputGroup>
                                                <Input className="loginFormInput password-field" required placeholder="Password" type={passwordShown ? "text" : "password"} value={signUpPass} onChange={(e)=>setSignUpPass(e.target.value)}/>
                                                    <InputGroupAddon addonType="append">
                                                        <InputGroupText className="inputPasswordIcon">
                                                            <i className={passwordShown ? "fa fa-eye-slash" : "fa fa-eye"} onClick={()=>togglePasswordVisiblity(!passwordShown)} aria-hidden="true"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup className="login-form-group">
                                                <InputGroup>
                                                    <Input className="loginFormInput password-field" required placeholder="Retype Password" type={repasswordShown ? "text" : "password"} value={signUpRePass} onChange={(e)=>setSignUpRePass(e.target.value)}/>
                                                    <InputGroupAddon addonType="append">
                                                        <InputGroupText className="inputPasswordIcon">
                                                            <i className={repasswordShown ? "fa fa-eye-slash" : "fa fa-eye"} onClick={()=>toggleRePasswordVisiblity(!repasswordShown)} aria-hidden="true"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormGroup>
                                            { message && 
                                                <Alert color="warning">
                                                    {message}
                                                </Alert>
                                            }    
                                            { error && 
                                                <Alert color="danger">
                                                    {error}
                                                </Alert>
                                            }     
                                            <div className="login-button-container">    
                                                <Button block className="btn-round sign-in-btn" color="success" type="submit">
                                                    Sign Up
                                                </Button>
                                                <Link to="/login">
                                                <Button block className="link" type="button" color="link">
                                                    Login Here
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

export default SignUp;
