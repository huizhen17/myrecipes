import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
// nodejs library that concatenates strings
import classnames from "classnames";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Container
} from 'reactstrap';
import { Link } from 'react-router-dom';

const HomeNavbar = ({user}) => {

    const [navbarColor, setNavbarColor] = useState("navbar-transparent");
    const [isOpen, setIsOpen] = useState(false);

    const history = useHistory();

    const toggle = () => setIsOpen(!isOpen);
    
    useEffect(() => {
        const updateNavbarColor = () => {
            if (document.documentElement.scrollTop > 99 || document.body.scrollTop > 99) {
                setNavbarColor("");
            } else if (document.documentElement.scrollTop < 100 || document.body.scrollTop < 100) {
                setNavbarColor("navbar-transparent");
            }
        };

        window.addEventListener("scroll", updateNavbarColor);

        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });

    const logOut = () => {
        localStorage.removeItem("userinfo");
        history.push('/');
        window.location.reload(false);
    }

    return (
    <div>
      <Navbar className={classnames("nav-bar fixed-top", navbarColor)}  expand="md">
        <Container>
            <NavbarBrand className="link" href="/">
                FOOD<b className="finder">FINDER</b>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto float-right" navbar>
                    {user.length === 0 ? 
                        <>
                            <NavItem>
                                <NavLink className="link padding-right" href="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <Link to="/signup">
                                    <Button color="success">Sign Up</Button>
                                </Link>
                            </NavItem>
                        </>
                    :
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="link padding-right" nav caret>
                                {user.name}
                            </DropdownToggle>
                            <DropdownMenu right style={{marginTop:"12px"}}>
                                <Link to={'/profile'}>
                                    <DropdownItem className="dropdownItem">
                                        Edit Profile
                                    </DropdownItem>
                                </Link>
                                <Link to={'/favourite'}>
                                    <DropdownItem className="dropdownItem">
                                        Favourite Menu
                                    </DropdownItem>
                                </Link>
                                <DropdownItem className="dropdownItem" onClick={logOut}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        
                    }
                </Nav>
            </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HomeNavbar;