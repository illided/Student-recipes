import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Egg from "./Egg.jsx";

const TopBar = (props) => {
  let links = props.links;
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand>
        <Egg />
        Студенческие рецепты
      </Navbar.Brand>
      <Nav>
        {links.map((link) => (
          <Nav.Link as={Link} to={link.href}>
            {link.title}
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
};

export default TopBar;
