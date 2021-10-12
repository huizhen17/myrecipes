import React, {useState} from 'react'

import {
    Container,
    Row,
    Col,
    Form,
    Input,
    Button
} from "reactstrap";
import HomeNavbar from '../components/HomeNavbar';

function Login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    // const [error, setError] = useState("");

    return (
        <div>
            <HomeNavbar/>
            <div className="main-section">
                <Container>
                    <Row>
                        <Col>
                        <div>
                            {/*Login a new account*/}
                            <Form className="login-form" style={{padding: "0px 150px 0px 0px"}}>                                          
                                <h2 className="title no-margin-top" >Welcome Back.</h2>
                                <p className="title">Sign in to your account to continue...</p>
                                <Input className="loginFormInput" autoFocus required placeholder="Email" type="email" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
                                <Input className="loginFormInput" required placeholder="Password" type="password" value={loginPass} onChange={(e)=>setLoginPass(e.target.value)}/>
                                <div>    
                                    <Button block className="btn-round" color="success" type="submit">
                                        Sign In
                                    </Button>
                                    <Button block className="btn-round" color="success">
                                        Create Account
                                    </Button>
                                </div>
                            </Form>            
                        </div>
                        </Col>
                        <Col>
                            <img  draggable="false"
                                src={require("../assets/img/login-pic.png").default} 
                                alt="login-img" /> 
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Login
