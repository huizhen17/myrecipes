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
    FormGroup
} from "reactstrap";

function Profile() {
    const [user, setLoginUser] = useState({});
    const history = useHistory();

    useEffect(async() => {
      await getLocalUsers();
    },[]);
  
    const getLocalUsers = async() => {
        let users = await JSON.parse(await localStorage.getItem('userinfo'));
        if(users.length === 0){
            setLoginUser({});
            history.push('/login');
        }else{
            let user = await JSON.parse(await localStorage.getItem('userinfo'));
            setLoginUser(user);
        }
    };


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
                                            <p className="small-title">View Your Profile </p>
                                            <FormGroup className="login-form-group">
                                                <Input className="loginFormInput" disabled placeholder="Username" type="text" value={user.name} />
                                            </FormGroup>
                                            <FormGroup className="login-form-group">
                                                <Input className="loginFormInput" disabled placeholder="Email" type="email" value={user.email} />
                                            </FormGroup>
                                            <div className="login-button-container">   
                                                <Link to="/"> 
                                                <Button block className="btn-round sign-in-btn" color="success" type="submit">
                                                    Back to Main Page
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
            
        </>
    )
}

export default Profile
