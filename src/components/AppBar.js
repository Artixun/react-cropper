import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap'

export class AppBar extends Component {
  render () {
    return (
      <Container className="p-0">
        <Navbar bg="light">
          <Navbar.Brand as={NavLink} to="/">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    )
  }
}

export default AppBar
