import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

import logo from './../assets/images/logo.svg'

export default class NavBar extends Component {
  render () {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>
              <img alt='Brand' id='logo' src={logo} />User Management
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/'>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to='/users'>
              <NavItem eventKey={2}>Users</NavItem>
            </LinkContainer>
            <LinkContainer to='/groups'>
              <NavItem eventKey={3}>Groups</NavItem>
            </LinkContainer>
            <NavDropdown title='New' id='nav-dropdown'>
              <LinkContainer to='/users/add'>
                <MenuItem eventKey={3.1}>User</MenuItem>
              </LinkContainer>
              <LinkContainer to='/groups/add'>
                <MenuItem eventKey={3.1}>Group</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
