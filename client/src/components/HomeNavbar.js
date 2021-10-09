import React, { useState } from 'react';
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

const HomeNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="nav-bar fixed-top" expand="md">
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
                        <NavLink className="link padding-right" href="/components/">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <Button color="success">Sign Up</Button>
                    </NavItem>
                </Nav>
            </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HomeNavbar;