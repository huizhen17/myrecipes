import React from 'react'
import { Container } from 'reactstrap';
import HomeNavbar from '../components/HomeNavbar';

function SingleRecipe(props) {
    console.log(props.match.params.id);
    return (
        <>
        <HomeNavbar/>
        <div className="section">
            <Container>
                <h2>My Recipe</h2>
            </Container>
        </div>
        </>
    )
}

export default SingleRecipe
