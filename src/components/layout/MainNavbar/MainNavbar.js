import React from "react";
import classNames from "classnames";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FormattedMessage } from 'react-intl';

import UserActions from "./NavbarNav/UserActions";

let colorDark = false
let colorThemeX = 'Blue'
let colorNavBar = "light"
let iconMode = "images/light2.png"
if (localStorage["colorTheme"]) {
    colorThemeX = localStorage.getItem('colorTheme')
    if (colorThemeX === 'Dark') {
       iconMode = "images/dark2.png"
       colorNavBar = "dark"
       colorDark = true
    }
}

const MainNavbar = ({ layout, stickyTop, colorDark }) => {
  let classes = null
  if (colorDark) {
    classes = classNames(
      "main-navbar",
      stickyTop && "sticky-top"
    )
  }else{
    classes = classNames(
      "main-navbar",
      "bg-white",
      stickyTop && "sticky-top"
    )
  }

  return (

    <Navbar bg={colorNavBar} expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          { colorDark ?
            <div className="d-table m-auto">
              <img
                id="main-logo"
                style={{width: "25%"}}
                src={require("../../../images/imagotipo2.png")}
                alt=""
              />
            </div>
          :
            <div className="d-table m-auto">
              <img
                id="main-logo"
                style={{width: "25%"}}
                src={require("../../../images/imagotipo1.png")}
                alt=""
              />
            </div>
          }

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

            < UserActions colorDark={colorDark} iconMode={iconMode} />

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};


export default MainNavbar;
