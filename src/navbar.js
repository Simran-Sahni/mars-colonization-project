import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';


/**
 *
 * @param {props} props
 * @return {*}
 * @constructor
 */
function Navbarr(props) {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="#home">Conquer Mars</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="mr-auto">
          <NavDropdown title="Algorithms" id="basic-nav-dropdown">
            <NavDropdown.Item>A*</NavDropdown.Item>
            <NavDropdown.Item>Best First Search</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item >Dijkstra</NavDropdown.Item>
            <NavDropdown.Item >BFS</NavDropdown.Item>
            <NavDropdown.Item >DFS</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Speed" id="basic-nav-dropdown">
            <NavDropdown.Item onClick = {() => props.newSpeed(750)}>Slow</NavDropdown.Item>
            <NavDropdown.Item onClick = {() => props.newSpeed(350)}>Medium</NavDropdown.Item>
            <NavDropdown.Item onClick = {() => props.newSpeed(1)}>Fast</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>Visualize</Nav.Link>
        </Nav>
        <Nav.Link onClick ={props.randomize}>Randomize</Nav.Link>
        <Nav.Link onClick ={props.clearWalls}>Clear Grid</Nav.Link>
        <Nav.Link >Clear Path</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
Navbarr.propTypes = {
  clearWalls: PropTypes.func,
  randomize: PropTypes.func,
  newSpeed: PropTypes.func,
};
export default Navbarr;

