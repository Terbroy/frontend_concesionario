import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navba from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Navba className="navbar">
      <Container id="navbar__container">
        <Navba.Brand
          className="navbar__logo"
          href="#home"
          style={{
            backgroundImage:
              "url(../../../src/assets/img/logo-car-minimal-svg.svg)",
          }}
        ></Navba.Brand>
        <Nav.Link onClick={() => navigate("/home/register")}>
        <Button variant="btn btn-primary">Register</Button>
        </Nav.Link>
        {/* <div className="navbar__cuenta">
          <i className="fa-regular fa-user"></i>
        </div> */}
      </Container>
    </Navba>
  );
};

export default Navbar;
