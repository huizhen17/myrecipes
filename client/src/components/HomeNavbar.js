import React, { useState, useEffect } from 'react';
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

const HomeNavbar = (props) => {
    const [navbarColor, setNavbarColor] = useState("navbar-transparent");
    const [isOpen, setIsOpen] = useState(false);

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
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className="link padding-right" nav caret>
                            My Profile
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                Edit Profile
                            </DropdownItem>
                            <DropdownItem>
                                Favourite Menu
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                        <NavLink className="link padding-right" href="/login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <Link to="/signup">
                            <Button color="success">Sign Up</Button>
                        </Link>
                    </NavItem>
                </Nav>
            </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HomeNavbar;