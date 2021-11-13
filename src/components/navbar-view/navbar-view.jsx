import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export class NavBar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {
    const { user } = this.props;
    const movies = `/`;
    const profile = `/users/${user}`;

    if (!user) return null;

    return (
      <Navbar bg="light" collapseOnSelect fixed='top' expand="lg" variant="light" >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">

            <Nav.Link as={Link} to={movies} className="link-text">
              Movies
            </Nav.Link>

            <Nav.Link as={Link} to={profile} className="link-text">
              Profile
            </Nav.Link>

            <Nav.Link to={'/'} onClick={this.onLoggedOut}>
              Log Out
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}