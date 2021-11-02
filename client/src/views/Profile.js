import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';

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

function Profile() {
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

    return (
        <>
        <HomeNavbar user={user}/>
        <div className="main-signup-section" style={{backgroundImage:"url(" + require("../assets/img/login-section.jpg").default + ")", opacity: 1}}>
                <Container>
                    <Row>
                        <Col/>
                        <Col lg="6" style={{alignSelf:"center"}}>
                            <Jumbotron>
                                <Card>
                                    <CardBody className="m-4">
                                        <Form className="login-form" >                                          
                                            { user.name && <h2 className="small-title no-margin-top" >Welcome, {user.name}!</h2>}
                                            <p className="small-title">Reset your password? </p>
                                            <FormGroup className="login-form-group">
                                                <Input className="loginFormInput" disabled placeholder="Username" type="text" value={user.name} onChange={(e)=>setSignUpName(e.target.value)}/>
                                            </FormGroup>
                                            <FormGroup className="login-form-group">
                                                <Input className="loginFormInput" disabled placeholder="Email" type="email" value={user.email} onChange={(e)=>setSignUpEmail(e.target.value)}/>
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
                                                    Reset My Passowrd
                                                </Button>
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
            
        </>
    )
}

export default Profile
