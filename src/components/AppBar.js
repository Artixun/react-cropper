import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'

export class AppBar extends Component {
  render () {
    return (
      <Container className="p-0">
        <Navbar bg="light">
          <Navbar.Brand as={NavLink} to="/">React Cropper</Navbar.Brand>
        </Navbar>
      </Container>
    )
  }
}

export default AppBar
