import React, {useState} from 'react'
import { Link } from 'react-router-dom';

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
    InputGroup
} from "reactstrap";
import HomeNavbar from '../components/HomeNavbar';

function Login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    // const [error, setError] = useState("");

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = (value) => {
        setPasswordShown(value);
    };

    return (
        <div>
            <HomeNavbar/>
            <div className="main-login-section" style={{backgroundImage:"url(" + require("../assets/img/login-section.jpg").default + ")", opacity: 1}}>
                <Container>
                    <Row>
                        <Col/>
                        <Col lg="6" style={{alignSelf:"center"}}>
                            <Jumbotron>
                                <Card>
                                    <CardBody className="m-4">
                                        <Form className="login-form">                                          
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
                                            <div>    
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
